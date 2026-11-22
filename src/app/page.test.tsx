import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from "./page";

test("the home page shows the Workaora name as its main heading", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Workaora" }),
  ).toBeDefined();
});

test("the home page is honest that the product is not ready yet", () => {
  render(<Home />);

  expect(screen.getByText(/in development/i)).toBeDefined();
});
