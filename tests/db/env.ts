/**
 * Reads and checks the settings the database tests need.
 *
 * It reuses the app's own rules, so a problem is reported with the same
 * plain-language message, and a key's value is never printed.
 */
import { parsePublicEnv, parseServerEnv } from "@/lib/env/schema";

export type DbTestEnv = {
  url: string;
  publishableKey: string;
  secretKey: string;
};

export function getDbTestEnv(): DbTestEnv {
  const publicEnv = parsePublicEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });
  const serverEnv = parseServerEnv({
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  });

  return {
    url: publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    secretKey: serverEnv.SUPABASE_SECRET_KEY,
  };
}
