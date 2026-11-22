/**
 * Settings for the DATABASE tests (npm run test:db).
 *
 * These tests talk to the real DEVELOPMENT database over the internet,
 * so they are kept apart from the ordinary tests (npm run test), which
 * need no network and no keys.
 */
import { existsSync } from "node:fs";

import { defineConfig } from "vitest/config";

// Load the keys from .env.local, the same file the app itself reads.
if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["tests/db/**/*.test.ts"],
    allowOnly: false,
    // Network calls can be slow on a bad connection.
    testTimeout: 20_000,
    // Run test files one at a time, so tests never trip over each other's data.
    fileParallelism: false,
  },
});
