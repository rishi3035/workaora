/**
 * Reads and checks the settings the database tests need.
 *
 * It reuses the app's own rules, so a problem is reported with the same
 * plain-language message, and a key's value is never printed.
 */
import { parsePublicEnv, parseServerEnv } from "@/lib/env/schema";

import { DEV_PROJECT_REF } from "./dev-project";

export type DbTestEnv = {
  url: string;
  publishableKey: string;
  secretKey: string;
};

/** True only if the address belongs to the registered development project. */
export function isDevProjectUrl(url: string): boolean {
  let hostname: string;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return false;
  }
  return hostname === `${DEV_PROJECT_REF}.supabase.co`;
}

export function getDbTestEnv(): DbTestEnv {
  const publicEnv = parsePublicEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });
  const serverEnv = parseServerEnv({
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  });

  if (!isDevProjectUrl(publicEnv.NEXT_PUBLIC_SUPABASE_URL)) {
    throw new Error(
      [
        "Database tests stopped: .env.local does not point at the development project.",
        "",
        "These tests create and delete test accounts, so they only ever run against",
        `the registered development project (reference ${DEV_PROJECT_REF}).`,
        "Check NEXT_PUBLIC_SUPABASE_URL in .env.local.",
      ].join("\n"),
    );
  }

  return {
    url: publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    secretKey: serverEnv.SUPABASE_SECRET_KEY,
  };
}
