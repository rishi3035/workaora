import type { ComponentProps, ReactNode } from "react";

import { cn } from "./cn";

/**
 * A grey block that stands in for content while it loads.
 * Give it a size with class names, for example "h-6 w-40".
 */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-sunken", className)}
      {...props}
    />
  );
}

/**
 * Wraps a group of skeletons and tells screen readers that content is
 * loading, since the grey blocks themselves say nothing.
 */
export function LoadingRegion({
  label = "Loading",
  className,
  children,
}: {
  /** What is loading, for example "Loading profile". */
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="status" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
