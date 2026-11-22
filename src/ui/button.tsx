import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-semibold " +
  "transition-colors disabled:cursor-not-allowed disabled:opacity-60 " +
  "aria-busy:cursor-progress";

const variants: Record<ButtonVariant, string> = {
  // The one main action on a screen.
  primary:
    "border-primary bg-primary text-on-primary hover:border-primary-hover hover:bg-primary-hover",
  // A second, less important action.
  secondary: "border-fg bg-transparent text-fg hover:bg-sunken",
  // A quiet action, shown as underlined text.
  ghost:
    "border-transparent bg-transparent text-fg underline decoration-accent decoration-2 underline-offset-4 hover:bg-sunken",
  // Something destructive, such as deleting.
  danger:
    "border-danger bg-danger text-on-danger hover:border-danger-hover hover:bg-danger-hover",
};

const sizes: Record<ButtonSize, string> = {
  // 44px tall: comfortable to tap with a thumb.
  md: "min-h-11 px-4 py-2 text-base",
  // For dense desktop areas only.
  sm: "min-h-9 px-3 py-1 text-sm",
};

/** The class names for a button. Also used to make a link look like one. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks further presses while work is in progress. */
  loading?: boolean;
};

export function Button({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  // "button" by default, so a button never submits a form by accident.
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** A link that looks like a button. Use it when pressing it goes to another page. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  );
}
