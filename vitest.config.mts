import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Understand the "@/..." import shortcut defined in tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    // jsdom is a pretend browser, so components can be tested without a real one.
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    // Fail if a test file is accidentally left with `.only`, which would skip the others.
    allowOnly: false,
  },
});
