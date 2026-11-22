/**
 * Database connection for code that runs in the visitor's browser.
 *
 * It uses only the publishable key, which is designed to be public.
 * What a visitor can read or change is decided by the database's own
 * permission rules (Row Level Security), never by this file.
 */
import { createBrowserClient } from "@supabase/ssr";

import { publicEnv } from "@/lib/env/public";

import type { Database } from "./database.types";

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
