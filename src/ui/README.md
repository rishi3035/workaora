# UI (design system)

Reusable building blocks that every feature shares: buttons, fields, cards, dialogs and so on.

The full guide is in `docs/DESIGN_SYSTEM.md`. To see everything live, run the app and open `/dev/styleguide`.

Rules:

- Components here know nothing about the database or about any single feature.
- Colours, sizes and spacing come from the design tokens in `src/app/globals.css`, never one-off values.
- Every component must work with a keyboard, in light and dark, at phone width.
- A new component needs a test in `ui.test.tsx` and an entry on the style-guide page.
