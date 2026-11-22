// Adds readable checks such as toBeDisabled() and toHaveAccessibleName().
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Remove whatever the previous test rendered, so each test starts with an empty page.
afterEach(() => {
  cleanup();
});

// The pretend browser used for tests (jsdom) is missing a few pointer and
// scrolling features that real browsers have and the dialog and toast use.
// These stand-ins do nothing, which is all the tests need.
if (typeof Element !== "undefined") {
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= () => {};
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
}
