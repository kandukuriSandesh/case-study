// components/_tests_/Loader.test.tsx
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";
import { describe, it, expect } from "vitest";

describe("Loader", () => {
  it("renders a spinner", () => {
    render(<Loader />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });
});