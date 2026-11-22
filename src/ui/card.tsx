import type { ComponentProps } from "react";

import { cn } from "./cn";

type CardProps = ComponentProps<"div"> & {
  /**
   * The coloured bar on the card's left edge, Workaora's signature.
   * On by default. Pass "none" where a plain panel reads better.
   */
  edge?: "accent" | "none";
};

/** A panel that groups related content. */
export function Card({ edge = "accent", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-line bg-surface p-5 sm:p-6",
        edge === "accent" && "border-l-[3px] border-l-accent",
        className,
      )}
      {...props}
    />
  );
}
