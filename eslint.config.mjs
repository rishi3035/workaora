import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

// --- Workaora safety rules -------------------------------------------------
// These back up the "server-only" build lock with an earlier, clearer warning.

/** Only src/lib/supabase/ may create database connections. */
const supabasePackages = ["@supabase/ssr", "@supabase/supabase-js"].map(
  (name) => ({
    name,
    message:
      "Create database connections only through src/lib/supabase/ (browser, server or admin).",
    allowTypeImports: true,
  }),
);

/** Screen files (.tsx) may never use the admin connection. */
const adminConnection = {
  name: "@/lib/supabase/admin",
  message:
    "The admin connection bypasses all database security. Use it only in server-only .ts files (actions, queries, jobs), never in a component.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Turn off ESLint rules that would argue with Prettier about formatting.
  prettier,
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/supabase/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        { paths: supabasePackages },
      ],
    },
  },
  {
    files: ["src/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        { paths: [...supabasePackages, adminConnection] },
      ],
    },
  },
  {
    // Settings must be read through the checked modules in src/lib/env/.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/env/**", "src/instrumentation.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "MemberExpression[object.name='process'][property.name='env']",
          message:
            "Don't read process.env directly. Import the checked settings from src/lib/env/ instead.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
  ]),
]);

export default eslintConfig;
