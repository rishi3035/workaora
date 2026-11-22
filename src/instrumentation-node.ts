/**
 * The start-up settings check. Loaded only on the normal Node.js server
 * (see instrumentation.ts).
 */
import { EnvError } from "@/lib/env/schema";

export async function checkSettingsOrStop() {
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
