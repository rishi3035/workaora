/**
 * Tests for the design system's components.
 *
 * They check behaviour a person relies on: labels are connected to fields,
 * errors are announced, everything works with the keyboard alone, and an
 * automated accessibility checker finds no structural problems.
 */
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, test, vi } from "vitest";

import { Avatar, initialsFor } from "./avatar";
import { Badge } from "./badge";
import { Button, ButtonLink } from "./button";
import { Card } from "./card";
import { Checkbox } from "./checkbox";
import { cn } from "./cn";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./dialog";
import { Field, Input, Select, Textarea } from "./field";
import { LoadingRegion, Skeleton } from "./skeleton";
import { EmptyState, ErrorState } from "./states";
import { ToastProvider, useToast } from "./toast";

describe("Button", () => {
  test("runs its action when pressed with the mouse or the keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(3);
  });

  test("never submits a form unless asked to", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  test("while loading, it is marked busy and ignores presses", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("a button-styled link is a real link", () => {
    render(<ButtonLink href="/somewhere">Go</ButtonLink>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute(
      "href",
      "/somewhere",
    );
  });
});

describe("Field", () => {
  test("connects the label and the help text to the control", () => {
    render(
      <Field label="Headline" help="One line that says what you do.">
        {(control) => <Input {...control} />}
      </Field>,
    );

    const input = screen.getByLabelText("Headline");
    expect(input).toHaveAccessibleDescription(
      "One line that says what you do.",
    );
    expect(input).toBeRequired();
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  test("marks the control invalid and announces the error with it", () => {
    render(
      <Field
        label="Username"
        help="Letters and numbers."
        error="Already taken."
      >
        {(control) => <Input {...control} />}
      </Field>,
    );

    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(
      "Already taken. Letters and numbers.",
    );
  });

  test("an optional field says so and is not required", () => {
    render(
      <Field label="City" optional>
        {(control) => <Input {...control} />}
      </Field>,
    );

    const input = screen.getByLabelText(/City/);
    expect(input).not.toBeRequired();
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  test("works with a text area and a drop-down too", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Field label="About you">
          {(control) => <Textarea {...control} />}
        </Field>
        <Field label="Role">
          {(control) => (
            <Select {...control} defaultValue="editor">
              <option value="editor">Video editor</option>
              <option value="writer">Scriptwriter</option>
            </Select>
          )}
        </Field>
      </>,
    );

    await user.type(screen.getByLabelText("About you"), "I edit videos");
    expect(screen.getByLabelText("About you")).toHaveValue("I edit videos");

    await user.selectOptions(screen.getByLabelText("Role"), "writer");
    expect(screen.getByLabelText("Role")).toHaveValue("writer");
  });
});

describe("Checkbox", () => {
  test("can be ticked with the keyboard, and reads its description", async () => {
    const user = userEvent.setup();
    render(
      <Checkbox
        label="Share my email"
        description="Only for this application."
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Share my email" });
    expect(checkbox).toHaveAccessibleDescription("Only for this application.");
    expect(checkbox).not.toBeChecked();

    await user.tab();
    expect(checkbox).toHaveFocus();
    await user.keyboard(" ");
    expect(checkbox).toBeChecked();
  });
});

describe("Dialog", () => {
  function Example() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Withdraw application</Button>
        </DialogTrigger>
        <DialogContent
          title="Withdraw your application?"
          description="The organisation will no longer see it."
        >
          <DialogClose asChild>
            <Button variant="secondary">Keep it</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  test("opens from the keyboard with its title and description read out", async () => {
    const user = userEvent.setup();
    render(<Example />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.tab();
    await user.keyboard("{Enter}");

    const dialog = screen.getByRole("dialog", {
      name: "Withdraw your application?",
    });
    expect(dialog).toHaveAccessibleDescription(
      "The organisation will no longer see it.",
    );
    // Keyboard focus has moved inside the dialog.
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  test("Escape closes it and returns focus to the button that opened it", async () => {
    const user = userEvent.setup();
    render(<Example />);

    const opener = screen.getByRole("button", { name: "Withdraw application" });
    await user.click(opener);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  test("has a labelled close button", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(
      screen.getByRole("button", { name: "Withdraw application" }),
    );
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Close" }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Toast", () => {
  function Example() {
    const { show } = useToast();
    return (
      <Button
        onClick={() =>
          show({ tone: "success", title: "Saved", description: "All done." })
        }
      >
        Save
      </Button>
    );
  }

  test("shows a message that can be dismissed", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Example />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("All done.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  test("explains itself if used without its provider", () => {
    // React logs the error as well as throwing it. Silence that for this test.
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Example />)).toThrow(/ToastProvider/);
    silence.mockRestore();
  });
});

describe("Avatar", () => {
  test.each([
    ["Ananya Sharma", "AS"],
    ["rohan", "R"],
    ["  Sample   Studio  Pvt Ltd ", "SL"],
    ["अनन्या शर्मा", "अश"],
    // A wide, multi-part character: only the first is shown, so it fits.
    ["கார்த்திக் ராஜா", "கா"],
    ["", "?"],
  ])("initials for %j are %j", (name, expected) => {
    expect(initialsFor(name)).toBe(expected);
  });

  test("is hidden from screen readers, because the name is shown as text", () => {
    const { container } = render(<Avatar name="Ananya Sharma" />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Loading, empty and error states", () => {
  test("a loading area tells screen readers what is loading", () => {
    render(
      <LoadingRegion label="Loading profile">
        <Skeleton className="h-4 w-full" />
      </LoadingRegion>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Loading profile");
  });

  test("an empty state shows its message and action", () => {
    render(
      <EmptyState
        title="No portfolio items yet"
        description="Add your first piece of work."
        action={<Button>Add work</Button>}
      />,
    );
    expect(screen.getByText("No portfolio items yet")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add work" }),
    ).toBeInTheDocument();
  });

  test("an error state is announced straight away", () => {
    render(
      <ErrorState
        title="We could not load opportunities"
        description="Check your connection."
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "We could not load opportunities",
    );
  });
});

describe("cn (the class-name helper)", () => {
  test("lets a later class override an earlier one", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
  });

  test("keeps a Workaora text size and a text colour together", () => {
    expect(cn("text-label", "text-muted")).toBe("text-label text-muted");
    expect(cn("text-display-md", "text-danger")).toBe(
      "text-display-md text-danger",
    );
  });

  test("lets one Workaora text size replace another", () => {
    expect(cn("text-display-sm", "text-display-lg")).toBe("text-display-lg");
  });
});

describe("automated accessibility check", () => {
  test("a screen built from the components has no structural problems", async () => {
    const { container } = render(
      <main>
        <h1>Sample screen</h1>
        <Card>
          <Avatar name="Ananya Sharma" />
          <p>Ananya Sharma</p>
          <Badge tone="success">Open to work</Badge>
          <Button>Follow</Button>
          <ButtonLink href="/profile" variant="secondary">
            View profile
          </ButtonLink>
        </Card>
        <form>
          <Field label="Headline" help="One line." error="Too long.">
            {(control) => <Input {...control} />}
          </Field>
          <Field label="Role">
            {(control) => (
              <Select {...control}>
                <option>Video editor</option>
              </Select>
            )}
          </Field>
          <Field label="About" optional>
            {(control) => <Textarea {...control} />}
          </Field>
          <Checkbox
            label="Share my email"
            description="For this application."
          />
        </form>
        <LoadingRegion label="Loading">
          <Skeleton className="h-4" />
        </LoadingRegion>
        <EmptyState title="Nothing yet" description="Add something." />
        <ErrorState title="It failed" description="Try again." />
      </main>,
    );

    const report = await axe.run(container, {
      rules: {
        // Colours cannot be measured in this pretend browser. Contrast is
        // checked in a real browser on the style-guide page instead.
        "color-contrast": { enabled: false },
      },
    });

    expect(
      report.violations.map(
        (violation) => `${violation.id}: ${violation.help}`,
      ),
    ).toEqual([]);
  });
});
