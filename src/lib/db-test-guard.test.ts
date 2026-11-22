/**
 * Checks the guard that keeps the database tests on the development project.
 * This test needs no network and no keys.
 */
import { describe, expect, test } from "vitest";

import { DEV_PROJECT_REF } from "../../tests/db/dev-project";
import { isDevProjectUrl } from "../../tests/db/env";

describe("database tests only run against the development project", () => {
  test("accepts the registered development project", () => {
    expect(isDevProjectUrl(`https://${DEV_PROJECT_REF}.supabase.co`)).toBe(
      true,
    );
  });

  test.each([
    ["a different project", "https://abcdefghijklmnopqrst.supabase.co"],
    [
      "a look-alike address",
      `https://${DEV_PROJECT_REF}.supabase.co.example.com`,
    ],
    [
      "the reference used as a path",
      `https://example.com/${DEV_PROJECT_REF}.supabase.co`,
    ],
    ["a different domain", `https://${DEV_PROJECT_REF}.supabase.com`],
    ["something that is not an address", "not a url"],
    ["an empty value", ""],
  ])("refuses %s", (_label, url) => {
    expect(isDevProjectUrl(url)).toBe(false);
  });
});
