import { type ComponentProps, type ReactNode, useId } from "react";

import { cn } from "./cn";

type CheckboxProps = Omit<ComponentProps<"input">, "type" | "children"> & {
  label: ReactNode;
  /** Extra explanation shown under the label. */
  description?: string;
};

/**
 * A tick box with its label. The whole row can be tapped, and it is at
 * least 44px tall.
 */
export function Checkbox({
  label,
  description,
  className,
  ...props
}: CheckboxProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <label
      className={cn(
        "flex min-h-11 cursor-pointer items-start gap-3 py-2",
        "has-disabled:cursor-not-allowed has-disabled:text-muted",
        className,
      )}
    >
      <input
        type="checkbox"
        // Name the box by its label alone, so the description is read once,
        // after the name, instead of being run together with it.
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        className="mt-0.5 size-5 shrink-0 accent-primary"
        {...props}
      />
      <span className="flex flex-col">
        <span id={labelId}>{label}</span>
        {description ? (
          <span id={descriptionId} className="text-sm text-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
