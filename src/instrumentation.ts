/**
 * Runs once, when the server starts, before it handles any request.
 *
 * We use it to check the settings immediately, so a missing or wrong
 * setting stops the app with a clear message instead of causing a
 * confusing failure later.
 */
import { EnvError } from "@/lib/env/schema";

export async function register() {
  // Next.js can also run code in a lightweight "edge" environment.
  // Our settings checks are meant for the normal Node.js server.
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  // Importing each settings file runs its checks. We collect the problems
  // from both, so they are all reported together in one message.
  const settingsFiles = [
    () => import("@/lib/env/public"),
    () => import("@/lib/env/server"),
  ];

  const problems: string[] = [];
  for (const loadSettings of settingsFiles) {
    try {
      await loadSettings();
    } catch (error) {
      if (!(error instanceof EnvError)) {
        throw error;
      }
      problems.push(...error.problems);
    }
  }

  if (problems.length > 0) {
    // Print only the plain-language message (no code trace), then stop.
    console.error(`\n${new EnvError(problems).message}\n`);
    process.exit(1);
  }
}
