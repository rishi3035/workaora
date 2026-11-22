import { type ComponentProps, type ReactNode, useId } from "react";

import { cn } from "./cn";
import { AlertIcon } from "./icons";

/**
 * What a Field hands to the control inside it, so the label, help text and
 * error message are all announced with the control by screen readers.
 */
export type ControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  required?: true;
};

type FieldProps = {
  label: string;
  /** Extra guidance shown under the control. */
  help?: string;
  /** If set, the field is shown as invalid with this message. */
  error?: string;
  /** Fields are required unless marked optional. */
  optional?: boolean;
  className?: string;
  /** Receives the props to spread onto the Input, Textarea or Select. */
  children: (control: ControlProps) => ReactNode;
};

/**
 * A label, a control, optional help text and an optional error message,
 * wired together correctly.
 *
 *   <Field label="Headline" help="One line.">
 *     {(control) => <Input {...control} name="headline" />}
 *   </Field>
 */
export function Field({
  label,
  help,
  error,
  optional = false,
  className,
  children,
}: FieldProps) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  const describedBy =
    [error ? errorId : null, help ? helpId : null].filter(Boolean).join(" ") ||
    undefined;

  const control: ControlProps = { id };
  if (describedBy) {
    control["aria-describedby"] = describedBy;
  }
  if (error) {
    control["aria-invalid"] = true;
  }
  if (!optional) {
    control.required = true;
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional ? (
          <span className="font-normal text-muted"> (optional)</span>
        ) : null}
      </label>

      {children(control)}

      {help ? (
        <p id={helpId} className="text-sm text-muted">
          {help}
        </p>
      ) : null}

      {/* Always present, so screen readers announce an error when it appears. */}
      <div aria-live="polite">
        {error ? (
          <p
            id={errorId}
            className="flex items-start gap-1.5 text-sm font-semibold text-danger"
          >
            <AlertIcon className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

const controlBase =
  "w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-fg " +
  "placeholder:text-muted disabled:cursor-not-allowed disabled:bg-sunken disabled:text-muted " +
  // An invalid field gets a thicker red outline, as well as its message.
  "aria-invalid:border-2 aria-invalid:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input className={cn(controlBase, "min-h-11", className)} {...props} />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn(controlBase, "min-h-28", className)} {...props} />
  );
}

/**
 * The device's own drop-down. On phones this opens the familiar native
 * picker, which is easier to use than a custom one.
 */
export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(controlBase, "min-h-11", className)} {...props} />
  );
}
