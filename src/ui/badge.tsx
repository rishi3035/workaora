import type { ComponentProps } from "react";

import { cn } from "./cn";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "accent";

const tones: Record<BadgeTone, string> = {
  neutral: "border-line bg-surface text-fg",
  success: "border-transparent bg-success-soft text-success",
  warning: "border-transparent bg-warning-soft text-warning",
  danger: "border-transparent bg-danger-soft text-danger",
  accent: "border-transparent bg-accent text-on-accent",
};

type BadgeProps = ComponentProps<"span"> & {
  tone?: BadgeTone;
};

/**
 * A short status or tag, such as a skill or "Open to work".
 * Colour is never the only signal: the words must say what it means.
 */
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-sm font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
