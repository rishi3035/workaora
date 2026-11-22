"use client";

import { Toast as RadixToast } from "radix-ui";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "./cn";
import { AlertIcon, CheckIcon, CloseIcon, InfoIcon } from "./icons";

export type ToastTone = "success" | "danger" | "neutral";

export type ToastInput = {
  title: string;
  description?: string;
  tone?: ToastTone;
};

type ToastItem = ToastInput & { id: number };

type ToastApi = {
  /** Shows a short message in the corner of the screen. */
  show: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

const toneStyles: Record<ToastTone, string> = {
  success: "border-l-success",
  danger: "border-l-danger",
  neutral: "border-l-accent",
};

const toneIcons: Record<ToastTone, ReactNode> = {
  success: <CheckIcon className="mt-1 shrink-0 text-success" />,
  danger: <AlertIcon className="mt-1 shrink-0 text-danger" />,
  neutral: <InfoIcon className="mt-1 shrink-0" />,
};

/**
 * Toasts: short messages that confirm something happened, such as "Saved".
 *
 * Wrap the app (or a page) in ToastProvider once, then call
 * useToast().show(...) from any component inside it.
 *
 * Use a toast only for confirmation. Anything the person must read or act
 * on belongs on the page itself, because a toast disappears.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const show = useCallback((toast: ToastInput) => {
    const id = nextId.current;
    nextId.current += 1;
    setToasts((current) => [...current, { ...toast, id }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const api = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext value={api}>
      <RadixToast.Provider swipeDirection="right" duration={6000}>
        {children}

        {toasts.map((toast) => {
          const tone = toast.tone ?? "neutral";
          return (
            <RadixToast.Root
              key={toast.id}
              // Errors interrupt a screen reader; other messages wait their turn.
              type={tone === "danger" ? "foreground" : "background"}
              onOpenChange={(open) => {
                if (!open) {
                  remove(toast.id);
                }
              }}
              className={cn(
                "flex items-start gap-3 rounded-md border border-l-[3px] border-line bg-surface p-4 shadow-overlay",
                toneStyles[tone],
              )}
            >
              {toneIcons[tone]}
              <div className="flex-1">
                <RadixToast.Title className="font-semibold">
                  {toast.title}
                </RadixToast.Title>
                {toast.description ? (
                  <RadixToast.Description className="mt-1 text-sm text-muted">
                    {toast.description}
                  </RadixToast.Description>
                ) : null}
              </div>
              <RadixToast.Close
                aria-label="Dismiss"
                className="-mt-2 -mr-2 inline-grid size-11 shrink-0 place-items-center rounded-md hover:bg-sunken"
              >
                <CloseIcon />
              </RadixToast.Close>
            </RadixToast.Root>
          );
        })}

        <RadixToast.Viewport className="fixed right-0 bottom-0 z-50 flex w-full max-w-sm list-none flex-col gap-2 p-4 outline-none" />
      </RadixToast.Provider>
    </ToastContext>
  );
}

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) {
    throw new Error("useToast must be used inside a <ToastProvider>.");
  }
  return api;
}
