/**
 * Permission tests for the first three tables: staff, audit_log, app_settings.
 *
 * Most of these tests TRY SOMETHING FORBIDDEN and pass only if the database
 * refuses. That is the point: we prove the locks hold, not just that the
 * doors open for the right people.
 *
 * They run against the development database with temporary accounts, which
 * are deleted at the end. They never switch sign-up for 16–17-year-olds on.
 */
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import {
  createTestPerson,
  deleteTestPeople,
  removeLeftoverTestPeople,
  serverClient,
  type TestPerson,
  visitorClient,
} from "./helpers";

const MINORS_SWITCH = "minors_signup_enabled";

/**
 * The database's own codes for why something was refused. Checking the
 * code proves an action failed for the RIGHT reason, not because of a typo
 * or some unrelated problem.
 */
const REFUSED = {
  /** "You are not allowed to do this." */
  notAllowed: "42501",
  /** "This value breaks a rule" (missing reason, unknown role, wrong kind). */
  brokeARule: "23514",
  /** "That thing does not exist." */
  notFound: "P0002",
} as const;

type Outcome = { error: { code?: string; message: string } | null };

function expectRefused(outcome: Outcome, code: string) {
  expect(outcome.error, "expected the database to refuse this").not.toBeNull();
  expect(
    outcome.error?.code,
    `refused, but for an unexpected reason: ${outcome.error?.message}`,
  ).toBe(code);
}

let ordinaryUser: TestPerson;
let moderator: TestPerson;
let admin: TestPerson;

/** Reads the minors switch using the server connection. */
async function readMinorsSwitch(): Promise<unknown> {
  const { data, error } = await serverClient()
    .from("app_settings")
    .select("value")
    .eq("key", MINORS_SWITCH)
    .single();
  expect(error).toBeNull();
  return data?.value;
}

beforeAll(async () => {
  await removeLeftoverTestPeople();

  ordinaryUser = await createTestPerson("user");
  moderator = await createTestPerson("moderator");
  admin = await createTestPerson("admin");

  const server = serverClient();
  for (const [person, role] of [
    [moderator, "moderator"],
    [admin, "admin"],
  ] as const) {
    const { error } = await server.rpc("set_staff_role", {
      p_user_id: person.id,
      p_role: role,
      p_reason: "Automated permission test",
    });
    expect(error).toBeNull();
  }
}, 60_000);

afterAll(async () => {
  const people = [ordinaryUser, moderator, admin].filter(
    (person): person is TestPerson => person !== undefined,
  );
  await deleteTestPeople(people);
}, 60_000);

describe("a visitor who is not logged in", () => {
  test("cannot read the staff list", async () => {
    const { data, error } = await visitorClient().from("staff").select("*");
    expectRefused({ error }, REFUSED.notAllowed);
    expect(data ?? []).toEqual([]);
  });

  test("cannot read the audit log", async () => {
    const { data, error } = await visitorClient().from("audit_log").select("*");
    expectRefused({ error }, REFUSED.notAllowed);
    expect(data ?? []).toEqual([]);
  });

  test("can read the minors switch, and it is off", async () => {
    const { data, error } = await visitorClient()
      .from("app_settings")
      .select("value")
      .eq("key", MINORS_SWITCH)
      .single();
    expect(error).toBeNull();
    expect(data?.value).toBe(false);
  });

  test("cannot change a setting, directly or through the function", async () => {
    const direct = await visitorClient()
      .from("app_settings")
      .update({ value: true })
      .eq("key", MINORS_SWITCH)
      .select();
    expectRefused(direct, REFUSED.notAllowed);

    const viaFunction = await visitorClient().rpc("set_app_setting", {
      p_key: MINORS_SWITCH,
      p_value: true,
      p_reason: "A visitor trying to switch it on",
    });
    expectRefused(viaFunction, REFUSED.notAllowed);

    expect(await readMinorsSwitch()).toBe(false);
  });
});

describe("an ordinary logged-in user", () => {
  test("sees an empty staff list", async () => {
    const { data, error } = await ordinaryUser.client.from("staff").select("*");
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });

  test("cannot make themselves staff", async () => {
    const direct = await ordinaryUser.client.from("staff").insert({
      user_id: ordinaryUser.id,
      role: "admin",
      grant_reason: "Trying to promote myself",
    });
    expectRefused(direct, REFUSED.notAllowed);

    const viaFunction = await ordinaryUser.client.rpc("set_staff_role", {
      p_user_id: ordinaryUser.id,
      p_role: "admin",
      p_reason: "Trying to promote myself",
    });
    expectRefused(viaFunction, REFUSED.notAllowed);

    const { data } = await serverClient()
      .from("staff")
      .select("user_id")
      .eq("user_id", ordinaryUser.id);
    expect(data).toEqual([]);
  });

  test("sees an empty audit log and cannot write to it", async () => {
    const read = await ordinaryUser.client.from("audit_log").select("*");
    expect(read.error).toBeNull();
    expect(read.data).toEqual([]);

    const write = await ordinaryUser.client.rpc("record_audit_event", {
      p_actor_id: ordinaryUser.id,
      p_action: "fake.entry",
    });
    expectRefused(write, REFUSED.notAllowed);

    const insert = await ordinaryUser.client
      .from("audit_log")
      .insert({ actor_kind: "authenticated", action: "fake.entry" });
    expectRefused(insert, REFUSED.notAllowed);
  });

  test("cannot change a setting, directly or through the function", async () => {
    const direct = await ordinaryUser.client
      .from("app_settings")
      .update({ value: true })
      .eq("key", MINORS_SWITCH)
      .select();
    expectRefused(direct, REFUSED.notAllowed);

    const viaFunction = await ordinaryUser.client.rpc("set_app_setting", {
      p_key: MINORS_SWITCH,
      p_value: true,
      p_reason: "An ordinary user trying to switch it on",
    });
    expectRefused(viaFunction, REFUSED.notAllowed);

    expect(await readMinorsSwitch()).toBe(false);
  });
});

describe("a moderator", () => {
  test("can read the staff list", async () => {
    const { data, error } = await moderator.client
      .from("staff")
      .select("user_id, role");
    expect(error).toBeNull();
    expect(data).toEqual(
      expect.arrayContaining([
        { user_id: moderator.id, role: "moderator" },
        { user_id: admin.id, role: "admin" },
      ]),
    );
  });

  test("can read the audit log, which recorded their own appointment", async () => {
    const { data, error } = await moderator.client
      .from("audit_log")
      .select("action, target_id, metadata")
      .eq("action", "staff.granted")
      .eq("target_id", moderator.id);
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
    expect(data?.[0]?.metadata).toMatchObject({
      role: "moderator",
      reason: "Automated permission test",
    });
  });

  test("cannot promote themselves", async () => {
    const { error } = await moderator.client
      .from("staff")
      .update({ role: "admin" })
      .eq("user_id", moderator.id)
      .select();
    expectRefused({ error }, REFUSED.notAllowed);
  });

  test("cannot change a setting", async () => {
    const { error } = await moderator.client.rpc("set_app_setting", {
      p_key: MINORS_SWITCH,
      p_value: true,
      p_reason: "A moderator trying to switch it on",
    });
    expectRefused({ error }, REFUSED.notAllowed);
    expect(await readMinorsSwitch()).toBe(false);
  });

  test("cannot edit or delete audit log entries", async () => {
    const edit = await moderator.client
      .from("audit_log")
      .update({ action: "tampered.entry" })
      .eq("target_id", moderator.id)
      .select();
    expectRefused(edit, REFUSED.notAllowed);

    const remove = await moderator.client
      .from("audit_log")
      .delete()
      .eq("target_id", moderator.id)
      .select();
    expectRefused(remove, REFUSED.notAllowed);
  });
});

describe("an admin", () => {
  test("must give a real reason to change a setting", async () => {
    const { error } = await admin.client.rpc("set_app_setting", {
      p_key: MINORS_SWITCH,
      p_value: false,
      p_reason: "short",
    });
    expectRefused({ error }, REFUSED.brokeARule);
  });

  test("cannot store a value of the wrong kind", async () => {
    const { error } = await admin.client.rpc("set_app_setting", {
      p_key: MINORS_SWITCH,
      p_value: "yes",
      p_reason: "Deliberately the wrong kind of value",
    });
    expectRefused({ error }, REFUSED.brokeARule);
    expect(await readMinorsSwitch()).toBe(false);
  });

  test("cannot invent a setting that does not exist", async () => {
    const { error } = await admin.client.rpc("set_app_setting", {
      p_key: "no_such_setting",
      p_value: true,
      p_reason: "Deliberately an unknown setting",
    });
    expectRefused({ error }, REFUSED.notFound);
  });

  test("can set a setting with a reason, and the change is logged", async () => {
    // Sets the switch to false, the value it already has. This proves an
    // admin is allowed through without ever switching minors' sign-up on.
    const reason = `Automated permission test ${Date.now()}`;
    const { error } = await admin.client.rpc("set_app_setting", {
      p_key: MINORS_SWITCH,
      p_value: false,
      p_reason: reason,
    });
    expect(error).toBeNull();
    expect(await readMinorsSwitch()).toBe(false);

    const { data } = await admin.client
      .from("audit_log")
      .select("actor_id, action, target_id, metadata")
      .eq("action", "app_setting.changed")
      .eq("metadata->>reason", reason);
    expect(data).toHaveLength(1);
    expect(data?.[0]).toMatchObject({
      actor_id: admin.id,
      target_id: MINORS_SWITCH,
      metadata: { old_value: false, new_value: false },
    });
  });

  test("cannot edit or delete audit log entries", async () => {
    const edit = await admin.client
      .from("audit_log")
      .update({ action: "tampered.entry" })
      .eq("target_id", admin.id)
      .select();
    expectRefused(edit, REFUSED.notAllowed);

    const remove = await admin.client
      .from("audit_log")
      .delete()
      .eq("target_id", admin.id)
      .select();
    expectRefused(remove, REFUSED.notAllowed);
  });
});

describe("our own server (the secret key)", () => {
  test("cannot edit or delete audit log entries", async () => {
    const edit = await serverClient()
      .from("audit_log")
      .update({ action: "tampered.entry" })
      .eq("target_id", admin.id)
      .select();
    expectRefused(edit, REFUSED.notAllowed);

    const remove = await serverClient()
      .from("audit_log")
      .delete()
      .eq("target_id", admin.id)
      .select();
    expectRefused(remove, REFUSED.notAllowed);

    const { data } = await serverClient()
      .from("audit_log")
      .select("action")
      .eq("action", "staff.granted")
      .eq("target_id", admin.id);
    expect(data).toHaveLength(1);
  });

  test("cannot add staff by writing to the table directly", async () => {
    const { error } = await serverClient().from("staff").insert({
      user_id: ordinaryUser.id,
      role: "admin",
      grant_reason: "Direct insert, skipping the function",
    });
    expectRefused({ error }, REFUSED.notAllowed);
  });

  test("must give a reason, and a valid role, to grant a staff role", async () => {
    const noReason = await serverClient().rpc("set_staff_role", {
      p_user_id: ordinaryUser.id,
      p_role: "moderator",
      p_reason: "",
    });
    expectRefused(noReason, REFUSED.brokeARule);

    const badRole = await serverClient().rpc("set_staff_role", {
      p_user_id: ordinaryUser.id,
      p_role: "owner",
      p_reason: "A role that does not exist",
    });
    expectRefused(badRole, REFUSED.brokeARule);
  });

  test("cannot change a setting, because it is not a logged-in admin", async () => {
    const { error } = await serverClient().rpc("set_app_setting", {
      p_key: MINORS_SWITCH,
      p_value: true,
      p_reason: "The server trying to switch it on",
    });
    expectRefused({ error }, REFUSED.notAllowed);
    expect(await readMinorsSwitch()).toBe(false);
  });

  test("can record an audit event, with a properly named action only", async () => {
    const good = await serverClient().rpc("record_audit_event", {
      p_actor_id: admin.id,
      p_action: "test.event_recorded",
      p_target_type: "test",
      p_target_id: admin.id,
      p_metadata: { source: "permission test" },
    });
    expect(good.error).toBeNull();

    const bad = await serverClient().rpc("record_audit_event", {
      p_actor_id: admin.id,
      p_action: "Not A Valid Action",
    });
    expectRefused(bad, REFUSED.brokeARule);
  });

  test("removing a staff member is logged with the reason", async () => {
    const { error } = await serverClient().rpc("set_staff_role", {
      p_user_id: moderator.id,
      p_role: null,
      p_reason: "Automated permission test: removal",
      p_acting_user_id: admin.id,
    });
    expect(error).toBeNull();

    const { data } = await serverClient()
      .from("audit_log")
      .select("actor_id, metadata")
      .eq("action", "staff.revoked")
      .eq("target_id", moderator.id);
    expect(data).toHaveLength(1);
    expect(data?.[0]).toMatchObject({
      actor_id: admin.id,
      metadata: {
        role: "moderator",
        reason: "Automated permission test: removal",
      },
    });

    // The former moderator has lost access straight away.
    const staffList = await moderator.client.from("staff").select("*");
    expect(staffList.data).toEqual([]);
  });
});

describe("the safety switch", () => {
  test("sign-up for 16–17-year-olds is off", async () => {
    expect(await readMinorsSwitch()).toBe(false);
  });
});
