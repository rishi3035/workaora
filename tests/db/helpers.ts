/**
 * Shared tools for the database tests: connections and temporary test people.
 */
import { randomBytes, randomUUID } from "node:crypto";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { type DbTestEnv, getDbTestEnv } from "./env";

/** Every test account's email starts with this, so leftovers are easy to find. */
const TEST_EMAIL_PREFIX = "wk-test-";
/** example.com is reserved for testing. No real mailbox exists there. */
const TEST_EMAIL_DOMAIN = "example.com";

let cachedEnv: DbTestEnv | undefined;
function env(): DbTestEnv {
  cachedEnv ??= getDbTestEnv();
  return cachedEnv;
}

/** A connection that never stores or refreshes a login. */
function connect(key: string): SupabaseClient {
  return createClient(env().url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

/** Our server's connection (secret key). */
export function serverClient(): SupabaseClient {
  return connect(env().secretKey);
}

/** A visitor who is not logged in. */
export function visitorClient(): SupabaseClient {
  return connect(env().publishableKey);
}

export type TestPerson = {
  id: string;
  /** A connection logged in as this person. */
  client: SupabaseClient;
};

/** Creates a temporary account and returns a connection logged in as it. */
export async function createTestPerson(label: string): Promise<TestPerson> {
  const email = `${TEST_EMAIL_PREFIX}${label}-${randomUUID()}@${TEST_EMAIL_DOMAIN}`;
  const password = randomBytes(24).toString("base64url");

  const { data, error } = await serverClient().auth.admin.createUser({
    email,
    password,
    // Mark the address as confirmed, so no email is sent anywhere.
    email_confirm: true,
  });
  if (error || !data.user) {
    throw new Error(
      `Could not create the test account "${label}": ${error?.message ?? "no account returned"}`,
    );
  }

  const client = connect(env().publishableKey);
  const signIn = await client.auth.signInWithPassword({ email, password });
  if (signIn.error) {
    throw new Error(
      `Could not log in as the test account "${label}": ${signIn.error.message}`,
    );
  }

  return { id: data.user.id, client };
}

/** Deletes temporary accounts. Their staff entries are removed with them. */
export async function deleteTestPeople(people: TestPerson[]): Promise<void> {
  const server = serverClient();
  for (const person of people) {
    const { error } = await server.auth.admin.deleteUser(person.id);
    if (error) {
      throw new Error(`Could not delete a test account: ${error.message}`);
    }
  }
}

/**
 * Removes test accounts left behind by an earlier run that crashed.
 * Only accounts with the test prefix AND the reserved test domain are touched.
 */
export async function removeLeftoverTestPeople(): Promise<number> {
  const server = serverClient();
  const { data, error } = await server.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (error) {
    throw new Error(`Could not list accounts: ${error.message}`);
  }

  const leftovers = data.users.filter(
    (user) =>
      user.email?.startsWith(TEST_EMAIL_PREFIX) === true &&
      user.email.endsWith(`@${TEST_EMAIL_DOMAIN}`),
  );
  for (const user of leftovers) {
    await server.auth.admin.deleteUser(user.id);
  }
  return leftovers.length;
}
