/**
 * Rules for the app's settings ("environment variables").
 *
 * This file only describes and checks the rules. It never reads the real
 * settings itself, so it is safe to import anywhere and easy to test.
 *
 * Security rule: error messages must never contain a setting's value,
 * because error messages end up in logs and on screens.
 */
import { z } from "zod";

const PUBLISHABLE_PREFIX = "sb_publishable_";
const SECRET_PREFIX = "sb_secret_";
/** Supabase's old-style keys are long tokens that start with these letters. */
const LEGACY_KEY_PREFIX = "eyJ";

const LEGACY_KEY_HELP =
  "looks like an old-style Supabase key (anon or service_role). Supabase is retiring those. " +
  "Use the new keys from Supabase → Project Settings → API Keys.";

/** Treat an empty or whitespace-only setting the same as a missing one. */
const requiredText = z
  .string({ error: "is missing." })
  .trim()
  .min(1, { error: "is missing." });

function isAllowedSupabaseUrl(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  return url.protocol === "https:" || (url.protocol === "http:" && isLocal);
}

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: requiredText.refine(isAllowedSupabaseUrl, {
    error:
      "must be a full https:// address, like https://your-project.supabase.co",
  }),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: requiredText.superRefine(
    (value, ctx) => {
      if (value.startsWith(SECRET_PREFIX)) {
        ctx.addIssue({
          code: "custom",
          message:
            "contains a SECRET key. Anything starting with NEXT_PUBLIC_ is sent to every visitor's browser. " +
            "Remove it now, and replace (rotate) that secret key in the Supabase dashboard, because it may have been exposed.",
        });
      } else if (value.startsWith(LEGACY_KEY_PREFIX)) {
        ctx.addIssue({ code: "custom", message: LEGACY_KEY_HELP });
      } else if (!value.startsWith(PUBLISHABLE_PREFIX)) {
        ctx.addIssue({
          code: "custom",
          message: `must be the publishable key, which starts with "${PUBLISHABLE_PREFIX}".`,
        });
      }
    },
  ),
});

const serverEnvSchema = z.object({
  SUPABASE_SECRET_KEY: requiredText.superRefine((value, ctx) => {
    if (value.startsWith(PUBLISHABLE_PREFIX)) {
      ctx.addIssue({
        code: "custom",
        message: `contains the publishable key. It needs the secret key, which starts with "${SECRET_PREFIX}".`,
      });
    } else if (value.startsWith(LEGACY_KEY_PREFIX)) {
      ctx.addIssue({ code: "custom", message: LEGACY_KEY_HELP });
    } else if (!value.startsWith(SECRET_PREFIX)) {
      ctx.addIssue({
        code: "custom",
        message: `must be the secret key, which starts with "${SECRET_PREFIX}".`,
      });
    }
  }),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

type RawEnv = Record<string, string | undefined>;

/**
 * Thrown when settings are missing or wrong.
 * Its message never contains a setting's value, so it is safe to show.
 */
export class EnvError extends Error {
  override readonly name = "EnvError";
  /** One plain-language line per problem, e.g. "SOME_SETTING is missing." */
  readonly problems: readonly string[];

  constructor(problems: readonly string[]) {
    super(
      [
        "Workaora can't start because some settings are missing or wrong:",
        "",
        ...problems.map((problem) => `  - ${problem}`),
        "",
        "How to fix: copy .env.example to .env.local in the project folder, fill in the values",
        "from your DEVELOPMENT Supabase project, then start the app again.",
      ].join("\n"),
    );
    this.problems = problems;
  }
}

function parseOrThrow<T>(schema: z.ZodType<T>, raw: RawEnv): T {
  const result = schema.safeParse(raw);
  if (result.success) {
    return result.data;
  }

  throw new EnvError(
    result.error.issues.map(
      (issue) => `${issue.path.join(".")} ${issue.message}`,
    ),
  );
}

/** Checks the settings that are safe for the browser. */
export function parsePublicEnv(raw: RawEnv): PublicEnv {
  return parseOrThrow(publicEnvSchema, raw);
}

/** Checks the settings that must stay on the server. */
export function parseServerEnv(raw: RawEnv): ServerEnv {
  return parseOrThrow(serverEnvSchema, raw);
}
