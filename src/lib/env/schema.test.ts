import { describe, expect, test } from "vitest";

import { EnvError, parsePublicEnv, parseServerEnv } from "./schema";

// Made-up values in the right shape. These are not real keys.
const VALID_URL = "https://abcdefghijklmnop.supabase.co";
const FAKE_PUBLISHABLE = "sb_publishable_FAKE-not-a-real-key";
const FAKE_SECRET = "sb_secret_FAKE-not-a-real-key";
const FAKE_LEGACY = "eyJhbGciOiJIUzI1NiJ9.FAKE.not-a-real-key";

const validPublic = {
  NEXT_PUBLIC_SUPABASE_URL: VALID_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: FAKE_PUBLISHABLE,
};

/** Runs the function and returns the message of the error it throws. */
function messageFrom(run: () => unknown): string {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(EnvError);
    return (error as Error).message;
  }
  throw new Error("Expected an EnvError, but nothing was thrown.");
}

describe("browser-safe settings", () => {
  test("accepts correct settings", () => {
    expect(parsePublicEnv(validPublic)).toEqual(validPublic);
  });

  test("accepts a local address for development tools", () => {
    const env = {
      ...validPublic,
      NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321",
    };
    expect(parsePublicEnv(env).NEXT_PUBLIC_SUPABASE_URL).toBe(
      "http://127.0.0.1:54321",
    );
  });

  test("names every missing setting and says how to fix it", () => {
    const message = messageFrom(() => parsePublicEnv({}));

    expect(message).toContain("NEXT_PUBLIC_SUPABASE_URL is missing.");
    expect(message).toContain(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing.",
    );
    expect(message).toContain(".env.example");
  });

  test("treats a blank setting as missing", () => {
    const message = messageFrom(() =>
      parsePublicEnv({ ...validPublic, NEXT_PUBLIC_SUPABASE_URL: "   " }),
    );
    expect(message).toContain("NEXT_PUBLIC_SUPABASE_URL is missing.");
  });

  test.each(["not-a-url", "http://example.com", "ftp://example.com"])(
    "rejects the address %s",
    (badUrl) => {
      const message = messageFrom(() =>
        parsePublicEnv({ ...validPublic, NEXT_PUBLIC_SUPABASE_URL: badUrl }),
      );
      expect(message).toContain("NEXT_PUBLIC_SUPABASE_URL must be a full");
    },
  );

  test("refuses a secret key in a browser-visible setting", () => {
    const message = messageFrom(() =>
      parsePublicEnv({
        ...validPublic,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: FAKE_SECRET,
      }),
    );
    expect(message).toContain("contains a SECRET key");
    expect(message).toContain("rotate");
  });

  test("refuses an old-style key", () => {
    const message = messageFrom(() =>
      parsePublicEnv({
        ...validPublic,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: FAKE_LEGACY,
      }),
    );
    expect(message).toContain("old-style Supabase key");
  });

  test("refuses a value that is not a publishable key", () => {
    const message = messageFrom(() =>
      parsePublicEnv({
        ...validPublic,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "something-else",
      }),
    );
    expect(message).toContain("must be the publishable key");
  });
});

describe("server-only settings", () => {
  test("accepts a secret key", () => {
    expect(parseServerEnv({ SUPABASE_SECRET_KEY: FAKE_SECRET })).toEqual({
      SUPABASE_SECRET_KEY: FAKE_SECRET,
    });
  });

  test("reports a missing secret key", () => {
    const message = messageFrom(() => parseServerEnv({}));
    expect(message).toContain("SUPABASE_SECRET_KEY is missing.");
  });

  test("refuses the publishable key where the secret key belongs", () => {
    const message = messageFrom(() =>
      parseServerEnv({ SUPABASE_SECRET_KEY: FAKE_PUBLISHABLE }),
    );
    expect(message).toContain("contains the publishable key");
  });

  test("refuses an old-style key", () => {
    const message = messageFrom(() =>
      parseServerEnv({ SUPABASE_SECRET_KEY: FAKE_LEGACY }),
    );
    expect(message).toContain("old-style Supabase key");
  });
});

describe("error messages never reveal setting values", () => {
  test.each([
    [
      "a secret key in the wrong place",
      () =>
        parsePublicEnv({
          ...validPublic,
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: FAKE_SECRET,
        }),
      FAKE_SECRET,
    ],
    [
      "an old-style key",
      () => parseServerEnv({ SUPABASE_SECRET_KEY: FAKE_LEGACY }),
      FAKE_LEGACY,
    ],
    [
      "an unrecognised secret",
      () => parseServerEnv({ SUPABASE_SECRET_KEY: "hunter2-wrong-shape" }),
      "hunter2-wrong-shape",
    ],
    [
      "a bad address",
      () =>
        parsePublicEnv({
          ...validPublic,
          NEXT_PUBLIC_SUPABASE_URL: "http://leaky.example.com",
        }),
      "leaky.example.com",
    ],
  ])("for %s", (_label, run, valueThatMustNotAppear) => {
    expect(messageFrom(run)).not.toContain(valueThatMustNotAppear);
  });
});

describe("a settings file that exists but has not been filled in", () => {
  // This is exactly what .env.local looks like right after copying .env.example.
  test("reports each blank setting once, not twice", () => {
    const publicError = (() => {
      try {
        parsePublicEnv({
          NEXT_PUBLIC_SUPABASE_URL: "",
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
        });
      } catch (error) {
        return error;
      }
    })();
    const serverError = (() => {
      try {
        parseServerEnv({ SUPABASE_SECRET_KEY: "" });
      } catch (error) {
        return error;
      }
    })();

    expect(publicError).toBeInstanceOf(EnvError);
    expect((publicError as EnvError).problems).toEqual([
      "NEXT_PUBLIC_SUPABASE_URL is missing.",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing.",
    ]);
    expect(serverError).toBeInstanceOf(EnvError);
    expect((serverError as EnvError).problems).toEqual([
      "SUPABASE_SECRET_KEY is missing.",
    ]);
  });
});

describe("combining problems from several checks", () => {
  test("one error can list problems from both sets of settings", () => {
    const error = new EnvError([
      "NEXT_PUBLIC_SUPABASE_URL is missing.",
      "SUPABASE_SECRET_KEY is missing.",
    ]);

    expect(error.problems).toHaveLength(2);
    expect(error.message).toContain("  - NEXT_PUBLIC_SUPABASE_URL is missing.");
    expect(error.message).toContain("  - SUPABASE_SECRET_KEY is missing.");
    expect(error.message).toContain(".env.example");
  });
});
