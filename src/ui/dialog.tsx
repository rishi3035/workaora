"use client";

import { Dialog as RadixDialog } from "radix-ui";
import type { ReactNode } from "react";

import { cn } from "./cn";
import { CloseIcon } from "./icons";

/**
 * A dialog: a panel that opens over the page and must be dealt with first.
 *
 * Built on Radix, which handles the hard parts correctly: keyboard focus
 * moves into the dialog and stays there, Escape closes it, and focus
 * returns to the button that opened it.
 *
 *   <Dialog>
 *     <DialogTrigger asChild><Button>Delete</Button></DialogTrigger>
 *     <DialogContent title="Delete this item?" description="This cannot be undone.">
 *       ...buttons...
 *     </DialogContent>
 *   </Dialog>
 */
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

type DialogContentProps = {
  /** Required. Read out when the dialog opens. */
  title: string;
  /** Required. One or two sentences on what the dialog is for. */
  description: string;
  children?: ReactNode;
  className?: string;
};

export function DialogContent({
  title,
  description,
  children,
  className,
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-40 bg-overlay" />
      <RadixDialog.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "max-h-[calc(100dvh-2rem)] overflow-y-auto",
          "rounded-md border border-line bg-surface p-6 shadow-overlay",
          className,
        )}
      >
        <RadixDialog.Title className="pr-10 font-display text-display-sm font-bold">
          {title}
        </RadixDialog.Title>
        <RadixDialog.Description className="mt-2 text-muted">
          {description}
        </RadixDialog.Description>

        {children ? <div className="mt-5">{children}</div> : null}

        <RadixDialog.Close
          aria-label="Close"
          className="absolute top-2 right-2 inline-grid size-11 place-items-center rounded-md text-xl hover:bg-sunken"
        >
          <CloseIcon />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
