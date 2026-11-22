/**
 * Checks that this computer can reach the development database and that
 * each key does what it should, and nothing more.
 *
 * These tests read only. They create and change nothing.
 */
import { createClient } from "@supabase/supabase-js";
import { beforeAll, describe, expect, test } from "vitest";

import { type DbTestEnv, getDbTestEnv } from "./env";

/** A connection that never stores or refreshes a login. */
function connect(url: string, key: string) {
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

describe("development database connection", () => {
  let env: DbTestEnv;

  beforeAll(() => {
    env = getDbTestEnv();
  });

  test("the project address and the publishable key are accepted", async () => {
    const response = await fetch(`${env.url}/auth/v1/settings`, {
      headers: { apikey: env.publishableKey },
    });

    expect(response.status).toBe(200);
  });

  test("the secret key is accepted for an admin-only request", async () => {
    const admin = connect(env.url, env.secretKey);

    const { error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 });

    expect(error).toBeNull();
  });

  test("the publishable key is REFUSED for an admin-only request", async () => {
    const visitor = connect(env.url, env.publishableKey);

    const { data, error } = await visitor.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });

    expect(error).not.toBeNull();
    expect(data.users).toEqual([]);
  });
});
