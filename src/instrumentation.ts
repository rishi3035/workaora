/**
 * Runs once, when the server starts, before it handles any request.
 *
 * We use it to check the settings immediately, so a missing or wrong
 * setting stops the app with a clear message instead of causing a
 * confusing failure later.
 */
export async function register() {
  // Next.js runs this in more than one kind of environment. The settings
  // check uses features of the normal Node.js server, so it lives in its
  // own file and is only loaded there (the pattern Next.js recommends).
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { checkSettingsOrStop } = await import("./instrumentation-node");
    await checkSettingsOrStop();
  }
}
