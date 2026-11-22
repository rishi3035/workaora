# Design System

How Workaora looks, and the building blocks every screen is made from.

**Chosen by the founder on 22 November 2026 (D-044):** Studio's fonts and colours with Arena's shapes.
**See it live:** run `npm.cmd run dev` and open `http://localhost:3000/dev/styleguide`. That page exists only while developing.

## The idea

- **Work-first and editorial.** Warm paper, ink, and one strong red. The interface steps back so people's work stands out.
- **Sharp and structured.** Almost-square corners (4px), thin soft outlines, no shadows on the page.
- **One signature.** A red bar on the left edge of cards.

## Rules for using it

1. **Use tokens, never one-off values.** Colours, fonts and corner sizes come from the names below. Tailwind's built-in colours are switched off, so an off-brand colour cannot be used by accident.
2. **One primary button per screen.**
3. **Red means brand, not "click me".** Links and quiet actions are ink-coloured with a red underline (D-045). Errors are red too, so an error always carries an icon and words, never colour alone.
4. **Every list and screen needs a loading, an empty and an error state.**
5. **Everything must work with the keyboard alone**, and the focus outline must never be removed.
6. **Check new screens in light and dark, at phone width first.**

## Tokens

Defined in `src/app/globals.css`. Each colour has a light and a dark value.

| Name | Used for | Class examples |
|------|----------|----------------|
| `bg` | The page | `bg-bg` |
| `surface` | Cards and panels | `bg-surface` |
| `sunken` | Placeholders, disabled fields, hover fills | `bg-sunken` |
| `fg` | Main text | `text-fg` |
| `muted` | Secondary text | `text-muted` |
| `line` | Soft outlines and dividers | `border-line` |
| `line-strong` | Outlines of form fields | `border-line-strong` |
| `primary`, `on-primary` | Main buttons and their text | `bg-primary text-on-primary` |
| `accent`, `on-accent` | Brand red: card edges, avatars, "new" badges | `bg-accent text-on-accent` |
| `success`, `success-soft` | Good news, confirmed | `text-success bg-success-soft` |
| `warning`, `warning-soft` | Needs attention | `text-warning bg-warning-soft` |
| `danger`, `danger-soft`, `on-danger` | Errors, destructive actions | `text-danger bg-danger-soft` |
| `focus` | The keyboard focus outline | set globally |
| `overlay` | The dimmed page behind a dialog | `bg-overlay` |

**Fonts**

| Name | Font | Used for |
|------|------|----------|
| `font-display` | Bricolage Grotesque | Headlines, names, numbers |
| `font-sans` | Instrument Sans | Everything else |

Names in Hindi and Marathi (Devanagari), Tamil, Bengali and Telugu use Noto Sans fonts. A visitor's browser downloads one of these only if the page contains that script. Other scripts use the device's own fonts.

Fonts are downloaded once when the app is built and served from our own address. Visitors' browsers do not contact Google.

**Text sizes:** `text-display-xl`, `text-display-lg`, `text-display-md`, `text-display-sm` for headlines; Tailwind's `text-lg`, `text-base`, `text-sm` for body; `text-label` (with `uppercase`) for small labels.

**Corners:** `rounded-md` (4px) for almost everything; `rounded-sm` (2px); `rounded-full` for dots and spinners.

**Shadows:** none, except `shadow-overlay` under dialogs and toasts.

**Light and dark:** the app follows the device setting. Putting `data-theme="light"` or `data-theme="dark"` on the page's root element forces one. A visible switch for users is not built yet.

## Components

All in `src/ui/`. Each file has a comment at the top explaining when to use it.

| Component | File | Notes |
|-----------|------|-------|
| `Button`, `ButtonLink` | `button.tsx` | Variants: primary, secondary, ghost, danger. Sizes: md (44px tall), sm. `loading` shows a spinner and blocks presses. |
| `Field`, `Input`, `Textarea`, `Select` | `field.tsx` | `Field` connects the label, help text and error to the control. Fields are required unless marked `optional`. `Select` is the device's own drop-down. |
| `Checkbox` | `checkbox.tsx` | The whole row can be tapped. Optional description. |
| `Card` | `card.tsx` | Red left edge by default; `edge="none"` for plain panels. |
| `Badge` | `badge.tsx` | Tones: neutral, success, warning, danger, accent. |
| `Avatar` | `avatar.tsx` | Initials only for now. Photos arrive with profile pictures in Phase 3. Works for names in any script. |
| `Dialog` | `dialog.tsx` | Built on Radix. A title and a description are required. |
| `ToastProvider`, `useToast` | `toast.tsx` | Built on Radix. For confirmations only. |
| `Skeleton`, `LoadingRegion` | `skeleton.tsx` | `LoadingRegion` tells screen readers what is loading. |
| `EmptyState`, `ErrorState` | `states.tsx` | `ErrorState` is announced straight away. |
| `cn` | `cn.ts` | Joins class names and lets a later one override an earlier one. |

## Accessibility: what was checked

| Check | How | Result (22 Nov 2026) |
|-------|-----|----------------------|
| Text contrast | Measured from the token values in a real browser | Every text pair is at least 4.5 to 1 in light and in dark. The lowest is 5.31. |
| Field outlines and focus outline | Same | At least 3 to 1. The lowest is 3.51. |
| Automated scan (axe-core, WCAG 2.0, 2.1 and 2.2 at levels A and AA) | Run on the style-guide page in a real browser | No issues in light or in dark; 27 rules checked |
| Structure and labelling | The same scanner in the automated tests | No issues |
| Keyboard | Automated tests press Tab, Enter, Space and Escape; one manual check of the focus outline in a real browser | Pass |
| Indian scripts | Hindi, Tamil, Bengali and Telugu samples on the style-guide page | Render correctly |

To repeat the scan: open the style guide, choose a theme, and press **Run accessibility scan** at the bottom of the page.

**What has not been checked:**
- A real screen reader (NVDA, TalkBack, VoiceOver). An automated scan finds only some problems.
- A real phone. Phone width was checked in the desktop browser only.
- Real users.

These belong in the Phase 10 accessibility pass, and earlier where a feature depends on them.

## Known trade-offs

- **Brand red and error red are close.** Mitigation: errors always have an icon, words and usually a tinted panel.
- **Small buttons (`size="sm"`) are 36px tall**, below the 44px touch guideline. Use them only in dense desktop areas.
- **Only four Indian scripts have a bundled font.** Others rely on the device.
- **The dark values are written twice in `globals.css`** (once for "follow device", once for "forced dark"). If you change one, change the other. This avoids a newer CSS feature that older phones may not support.
