import "server-only";

/**
 * Settings that must stay on the server.
 *
 * The "server-only" line above makes the build fail if any browser code
 * ever imports this file, directly or indirectly.
 */
import { parseServerEnv } from "./schema";

export const serverEnv = parseServerEnv({
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
});
