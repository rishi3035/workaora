import type { ReactNode } from "react";

import { cn } from "./cn";
import { AlertIcon } from "./icons";

type StateProps = {
  title: string;
  /** What happened and, if possible, what the person can do next. */
  description: string;
  /** Usually one Button or ButtonLink. */
  action?: ReactNode;
  className?: string;
};

/**
 * Shown where a list or section has nothing in it yet.
 * Say why it is empty and offer the next step.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: StateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-md border border-dashed border-line-strong px-6 py-10 text-center",
        className,
      )}
    >
      <p className="font-display text-display-sm font-bold">{title}</p>
      <p className="max-w-sm text-muted">{description}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

/**
 * Shown where something failed to load or save.
 * It is announced to screen readers straight away.
 */
export function ErrorState({
  title,
  description,
  action,
  className,
}: StateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col gap-3 rounded-md border border-danger bg-danger-soft p-5",
        className,
      )}
    >
      <p className="flex items-start gap-2 font-semibold text-danger">
        <AlertIcon className="mt-1 shrink-0" />
        <span>{title}</span>
      </p>
      <p>{description}</p>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
