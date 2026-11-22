"use client";

/**
 * The interactive parts of the style guide. Development only.
 */
import { useEffect, useState } from "react";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/ui/dialog";
import { ToastProvider, useToast } from "@/ui/toast";

type Theme = "system" | "light" | "dark";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("system");

  // Keep the page's theme in step with the choice. "Follow device" removes
  // the override, so the device's own light or dark setting applies.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex flex-wrap gap-2"
    >
      {(["system", "light", "dark"] as const).map((option) => (
        <Button
          key={option}
          size="sm"
          variant={option === theme ? "primary" : "secondary"}
          aria-pressed={option === theme}
          onClick={() => setTheme(option)}
        >
          {option === "system"
            ? "Follow device"
            : option === "light"
              ? "Light"
              : "Dark"}
        </Button>
      ))}
    </div>
  );
}

export function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 2000);
      }}
    >
      {loading ? "Saving" : "Press to see loading"}
    </Button>
  );
}

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Share my email with this organisation"
      description="Only for this application. You can withdraw it later."
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open a dialog</Button>
      </DialogTrigger>
      <DialogContent
        title="Withdraw your application?"
        description="The organisation will no longer see your application or any contact details you shared."
      >
        <div className="flex flex-wrap justify-end gap-3">
          <DialogClose asChild>
            <Button variant="secondary">Keep it</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger">Withdraw</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ToastButtons() {
  const { show } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          show({
            tone: "success",
            title: "Portfolio item saved",
            description: "It is now visible on your profile.",
          })
        }
      >
        Show a success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          show({
            tone: "danger",
            title: "Could not save",
            description: "Check your connection and try again.",
          })
        }
      >
        Show an error toast
      </Button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  );
}

type ScanIssue = {
  id: string;
  impact: string;
  help: string;
  count: number;
  example: string;
};

type ScanResult = { checked: number; issues: ScanIssue[] } | { failed: string };

/**
 * Runs axe-core, a widely used accessibility checker, against this page
 * as it is right now (current theme and screen width).
 */
export function AccessibilityScan() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  async function run() {
    setRunning(true);
    setResult(null);
    try {
      const { default: axe } = await import("axe-core");
      const report = await axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
        },
      });
      setResult({
        checked: report.passes.length + report.violations.length,
        issues: report.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact ?? "unknown",
          help: violation.help,
          count: violation.nodes.length,
          example: violation.nodes[0]?.target.join(" ") ?? "",
        })),
      });
    } catch (error) {
      setResult({
        failed: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Button variant="secondary" loading={running} onClick={run}>
          Run accessibility scan
        </Button>
      </div>

      <div aria-live="polite" data-testid="scan-result">
        {result === null ? null : "failed" in result ? (
          <p className="font-semibold text-danger">
            The scan could not run: {result.failed}
          </p>
        ) : result.issues.length === 0 ? (
          <p className="font-semibold text-success">
            No issues found. {result.checked} rules checked.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-danger">
              {result.issues.length} issue
              {result.issues.length === 1 ? "" : "s"} found. {result.checked}{" "}
              rules checked.
            </p>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
              {result.issues.map((issue) => (
                <li key={issue.id}>
                  <strong>{issue.impact}</strong>: {issue.help} ({issue.id},{" "}
                  {issue.count} place{issue.count === 1 ? "" : "s"}, e.g.{" "}
                  <code>{issue.example}</code>)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
