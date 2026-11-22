/**
 * Settings that are safe for the browser.
 *
 * Next.js copies anything named NEXT_PUBLIC_* into the code sent to visitors,
 * so nothing secret may ever live here.
 *
 * Each setting has to be written out in full (process.env.NEXT_PUBLIC_...),
 * because Next.js only recognises that exact form when building for the browser.
 */
import { parsePublicEnv } from "./schema";

export const publicEnv = parsePublicEnv({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});
