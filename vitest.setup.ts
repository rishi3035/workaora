import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Remove whatever the previous test rendered, so each test starts with an empty page.
afterEach(() => {
  cleanup();
});
