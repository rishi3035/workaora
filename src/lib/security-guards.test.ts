/**
 * Tripwires for the project's most important safety rules.
 *
 * These tests read the project's own files. They fail if someone (human
 * or AI) removes a guard, even if everything else still appears to work.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const projectRoot = resolve(import.meta.dirname, "../..");

function readProjectFile(relativePath: string): string {
  return readFileSync(resolve(projectRoot, relativePath), "utf8");
}

describe("server-only lock", () => {
  // Files that must never reach a visitor's browser.
  const lockedFiles = [
    "src/lib/supabase/admin.ts",
    "src/lib/supabase/server.ts",
    "src/lib/env/server.ts",
  ];

  test.each(lockedFiles)("%s starts with the server-only lock", (file) => {
    const firstLine = readProjectFile(file).split(/\r?\n/)[0];
    expect(firstLine).toBe('import "server-only";');
  });

  test("the browser connection never touches the secret settings", () => {
    const source = readProjectFile("src/lib/supabase/browser.ts");
    expect(source).not.toContain("env/server");
    expect(source).not.toContain("SECRET");
  });
});

describe("secrets stay out of Git", () => {
  test.each([".env.local", ".env", ".env.production", ".env.development"])(
    "Git ignores %s",
    (file) => {
      // "git check-ignore" exits successfully only if the file is ignored.
      const output = execFileSync("git", ["check-ignore", file], {
        cwd: projectRoot,
        encoding: "utf8",
      });
      expect(output.trim()).toBe(file);
    },
  );

  test("the settings template contains names only, no values", () => {
    const settingLines = readProjectFile(".env.example")
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"));

    expect(settingLines.length).toBeGreaterThan(0);
    for (const line of settingLines) {
      expect(line).toMatch(/^[A-Z0-9_]+=$/);
    }
  });

  test("no secret setting is given a browser-visible name", () => {
    const names = readProjectFile(".env.example")
      .split(/\r?\n/)
      .filter((line) => /^[A-Z0-9_]+=/.test(line))
      .map((line) => line.split("=")[0] ?? "");

    const exposedSecrets = names.filter(
      (name) => name.startsWith("NEXT_PUBLIC_") && /SECRET|SERVICE/.test(name),
    );
    expect(exposedSecrets).toEqual([]);
  });
});
