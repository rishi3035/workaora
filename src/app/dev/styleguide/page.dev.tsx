/**
 * The Workaora style guide: every design token and component on one page.
 *
 * Development only. The ".dev.tsx" ending means this page is not part of a
 * production build at all (see next.config.ts).
 *
 * Use it to check a component in light and dark, at phone and desktop
 * width, and with the keyboard alone, before using it in a feature.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Avatar } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button, ButtonLink } from "@/ui/button";
import { Card } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Field, Input, Select, Textarea } from "@/ui/field";
import { CheckIcon } from "@/ui/icons";
import { LoadingRegion, Skeleton } from "@/ui/skeleton";
import { EmptyState, ErrorState } from "@/ui/states";

import {
  AccessibilityScan,
  CheckboxDemo,
  DialogDemo,
  LoadingButtonDemo,
  ThemeSwitch,
  ToastDemo,
} from "./demos";

export const metadata: Metadata = {
  title: "Style guide",
};

const COLOURS: { name: string; use: string; swatch: string }[] = [
  { name: "bg", use: "The page", swatch: "bg-bg" },
  { name: "surface", use: "Cards and panels", swatch: "bg-surface" },
  { name: "sunken", use: "Placeholders, disabled fields", swatch: "bg-sunken" },
  { name: "fg", use: "Main text", swatch: "bg-fg" },
  { name: "muted", use: "Secondary text", swatch: "bg-muted" },
  { name: "line", use: "Soft outlines, dividers", swatch: "bg-line" },
  { name: "line-strong", use: "Field outlines", swatch: "bg-line-strong" },
  { name: "primary", use: "Main buttons", swatch: "bg-primary" },
  { name: "accent", use: "Brand red: card edges", swatch: "bg-accent" },
  { name: "success", use: "Good news, confirmed", swatch: "bg-success" },
  { name: "warning", use: "Needs attention", swatch: "bg-warning" },
  { name: "danger", use: "Errors, destructive actions", swatch: "bg-danger" },
];

function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <div className="border-b border-line pb-2">
        <h2 id={id} className="font-display text-display-md font-bold">
          {title}
        </h2>
        {note ? <p className="mt-1 text-muted">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

export default function StyleGuidePage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-4 py-10">
      <header className="flex flex-col gap-4 border-b-[3px] border-fg pb-6">
        <p className="text-label text-muted uppercase">
          Development only · Sample content
        </p>
        <h1 className="font-display text-display-xl font-bold">Style guide</h1>
        <p className="max-w-prose text-lg">
          Every colour, font and component Workaora is built from. If something
          is not here, it should not be on a screen.
        </p>
        <ThemeSwitch />
      </header>

      <Section
        id="sg-colours"
        title="Colours"
        note="Named by what they are for, not by what they look like. Each one has a light and a dark value."
      >
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {COLOURS.map((colour) => (
            <li key={colour.name} className="flex flex-col gap-1.5">
              <div
                aria-hidden="true"
                className={`h-14 rounded-md border border-line ${colour.swatch}`}
              />
              <code className="text-sm font-semibold">{colour.name}</code>
              <span className="text-sm text-muted">{colour.use}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="sg-type"
        title="Typography"
        note="Bricolage Grotesque for headlines, Instrument Sans for everything else."
      >
        <div className="flex flex-col gap-3">
          <p className="font-display text-display-xl font-bold">Display XL</p>
          <p className="font-display text-display-lg font-bold">
            Display large: a profile name
          </p>
          <p className="font-display text-display-md font-bold">
            Display medium: a section title
          </p>
          <p className="font-display text-display-sm font-bold">
            Display small: a card title
          </p>
          <p className="text-lg">
            Large body text, for introductions and headlines under a name.
          </p>
          <p>
            Body text. Most of what people read. It should be comfortable in
            long paragraphs and never smaller than this on a phone.
          </p>
          <p className="text-sm text-muted">
            Small text, for supporting details such as dates.
          </p>
          <p className="text-label text-muted uppercase">Label text</p>
          <p className="font-display text-display-md font-bold tabular-nums">
            ₹2,500 <span className="text-sm font-normal">per video</span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-label text-muted uppercase">
            Names in Indian scripts
          </p>
          <p className="font-display text-display-sm font-bold" lang="hi">
            अनन्या शर्मा
          </p>
          <p className="font-display text-display-sm font-bold" lang="ta">
            கார்த்திக் ராஜா
          </p>
          <p className="font-display text-display-sm font-bold" lang="bn">
            অর্পিতা সেন
          </p>
          <p className="font-display text-display-sm font-bold" lang="te">
            సాయి కిరణ్
          </p>
        </div>
      </Section>

      <Section
        id="sg-buttons"
        title="Buttons"
        note="One primary button per screen. Buttons are at least 44px tall so they are easy to tap."
      >
        <Row>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Row>
        <Row>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <LoadingButtonDemo />
        </Row>
        <Row>
          <Button size="sm">Small</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <ButtonLink href="/" variant="secondary">
            A link that looks like a button
          </ButtonLink>
        </Row>
      </Section>

      <Section
        id="sg-forms"
        title="Form fields"
        note="Every field has a visible label. Errors say what is wrong and how to fix it."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Professional headline"
            help="One line that says what you do. Shown under your name."
          >
            {(control) => (
              <Input
                {...control}
                name="sg-headline"
                defaultValue="Video editor for gaming channels"
              />
            )}
          </Field>

          <Field
            label="Username"
            help="Letters, numbers and underscores."
            error="That username is taken. Try adding a number."
          >
            {(control) => (
              <Input {...control} name="sg-username" defaultValue="ananya" />
            )}
          </Field>

          <Field label="Main role">
            {(control) => (
              <Select {...control} name="sg-role" defaultValue="editor">
                <option value="editor">Video editor</option>
                <option value="thumbnail">Thumbnail designer</option>
                <option value="writer">Scriptwriter</option>
                <option value="analyst">Esports analyst</option>
              </Select>
            )}
          </Field>

          <Field label="City" optional>
            {(control) => (
              <Input {...control} name="sg-city" placeholder="e.g. Pune" />
            )}
          </Field>

          <Field label="About you" optional className="sm:col-span-2">
            {(control) => (
              <Textarea
                {...control}
                name="sg-bio"
                placeholder="What kind of work do you want more of?"
              />
            )}
          </Field>

          <Field label="A disabled field" optional>
            {(control) => (
              <Input
                {...control}
                name="sg-disabled"
                disabled
                defaultValue="Cannot be changed"
              />
            )}
          </Field>
        </div>

        <div className="flex flex-col">
          <CheckboxDemo />
          <Checkbox label="A disabled option" disabled />
        </div>
      </Section>

      <Section
        id="sg-cards"
        title="Cards, badges and avatars"
        note="The red left edge is Workaora's signature. Badges always say what they mean in words."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar name="Ananya Sharma" size="lg" />
              <div>
                <p className="font-display text-display-sm font-bold">
                  Ananya Sharma
                </p>
                <p className="text-sm text-muted" lang="hi">
                  अनन्या शर्मा
                </p>
              </div>
            </div>
            <p>Video editor and motion designer for tech and gaming channels</p>
            <Row>
              <Badge tone="success">
                <CheckIcon /> Open to work
              </Badge>
              <Badge>Premiere Pro</Badge>
              <Badge>Hindi</Badge>
            </Row>
          </Card>

          <Card edge="none" className="flex flex-col gap-3">
            <p className="text-label text-muted uppercase">
              A card without the edge
            </p>
            <p>For plain panels where the red edge would be too much.</p>
            <Row>
              <Badge tone="accent">New</Badge>
              <Badge tone="warning">Awaiting review</Badge>
              <Badge tone="danger">Removed</Badge>
            </Row>
            <Row>
              <Avatar name="Sample Studio" size="sm" />
              <Avatar name="கார்த்திக் ராஜா" />
              <Avatar name="Rohan" />
            </Row>
          </Card>
        </div>
      </Section>

      <Section
        id="sg-overlays"
        title="Dialogs and toasts"
        note="A dialog interrupts and must be answered. A toast only confirms something that already happened."
      >
        <Row>
          <DialogDemo />
        </Row>
        <ToastDemo />
      </Section>

      <Section
        id="sg-states"
        title="Loading, empty and error states"
        note="Every list and screen needs all three. A blank area is never acceptable."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card edge="none">
            <LoadingRegion
              label="Loading profile"
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-12" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </LoadingRegion>
          </Card>

          <EmptyState
            title="No portfolio items yet"
            description="Add your first piece of work so people can see what you do."
            action={<Button>Add work</Button>}
          />

          <ErrorState
            className="sm:col-span-2"
            title="We could not load opportunities"
            description="This is usually a connection problem. Your data is safe."
            action={<Button variant="secondary">Try again</Button>}
          />
        </div>
      </Section>

      <Section
        id="sg-a11y"
        title="Accessibility check"
        note="Scans this page as it is now. Run it in light and in dark."
      >
        <AccessibilityScan />
      </Section>
    </main>
  );
}
