import "server-only";

/**
 * Database connection for code that runs on our server, acting as the
 * person who is logged in.
 *
 * It uses the publishable key plus that person's login cookies, so the
 * database's permission rules (Row Level Security) still apply in full.
 * This is the connection almost all server code should use.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { publicEnv } from "@/lib/env/public";

import type { Database } from "./database.types";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Deliberately ignored, and only here.
            // Next.js forbids changing cookies while a page is being drawn
            // (a Server Component) and throws if we try. Supabase's guidance
            // is to skip the write in that case, because login cookies are
            // refreshed by the request proxy instead. That proxy is added
            // with sign-in in Phase 2; revisit this block then.
          }
        },
      },
    },
  );
}
