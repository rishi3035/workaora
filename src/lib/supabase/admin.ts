import "server-only";

/**
 * DANGER: the admin database connection.
 *
 * It uses the secret key, which BYPASSES every permission rule in the
 * database. Whoever holds this connection can read and change everything.
 *
 * Rules for using it:
 *   1. Only in server code. The "server-only" line above makes the build
 *      fail if browser code imports this file, directly or indirectly.
 *   2. Only when the normal server connection cannot do the job, for
 *      example a scheduled clean-up job or a staff action.
 *   3. Check who is asking and whether they are allowed BEFORE using it.
 *      The database will not check for you.
 *   4. Record every sensitive use in the audit log.
 *   5. Never return its raw results to a visitor without choosing exactly
 *      which fields they may see.
 */
import { createClient } from "@supabase/supabase-js";

import { publicEnv } from "@/lib/env/public";
import { serverEnv } from "@/lib/env/server";

import type { Database } from "./database.types";

export function createSupabaseAdminClient() {
  return createClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SECRET_KEY,
    {
      auth: {
        // This connection is not a logged-in person, so it must never
        // store, refresh or pick up anyone's login.
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
}
