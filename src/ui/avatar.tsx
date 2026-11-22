import { cn } from "./cn";

export type AvatarSize = "sm" | "md" | "lg";

const sizes: Record<AvatarSize, string> = {
  sm: "size-8 text-sm",
  md: "size-12 text-lg",
  lg: "size-16 text-2xl",
};

/** The first visible character of a word, in any script. */
function firstCharacter(word: string): string {
  // A "character" as a reader sees it can be several code points, for
  // example a Devanagari letter with its vowel sign. Intl.Segmenter splits
  // text the way a reader would.
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segments = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    for (const { segment } of segments.segment(word)) {
      return segment;
    }
    return "";
  }
  return Array.from(word)[0] ?? "";
}

/**
 * "Ananya Sharma" becomes "AS". Works for names in any script.
 *
 * In some scripts one visible character is built from several parts and is
 * wide (for example the Tamil "கா"). Two of those do not fit in the box, so
 * in that case only the first is shown.
 */
export function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0];
  if (!first) {
    return "?";
  }
  const last = words.length > 1 ? words[words.length - 1] : undefined;
  const firstInitial = firstCharacter(first);
  const lastInitial = last ? firstCharacter(last) : "";
  const bothAreSimple =
    Array.from(firstInitial).length === 1 &&
    Array.from(lastInitial).length <= 1;

  return (
    bothAreSimple ? firstInitial + lastInitial : firstInitial
  ).toLocaleUpperCase();
}

type AvatarProps = {
  /** The person's or organisation's name. Used to work out the initials. */
  name: string;
  size?: AvatarSize;
  className?: string;
};

/**
 * A person or organisation shown as their initials.
 *
 * Photos are not supported yet. They arrive with profile pictures in
 * Phase 3, when image storage and its safety checks exist.
 *
 * The avatar is decorative: always show the name as text next to it.
 */
export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center overflow-hidden rounded-md bg-accent font-display leading-none font-bold text-on-accent",
        sizes[size],
        className,
      )}
    >
      {initialsFor(name)}
    </span>
  );
}
