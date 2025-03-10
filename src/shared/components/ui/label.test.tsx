import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Label } from "./label";

describe("Label", () => {
  it("should renders correctly", () => {
    render(<Label>Test Label</Label>);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should applies custom className when provided", () => {
    render(<Label className="custom-class">Test Label</Label>);

    expect(screen.getByText("Test Label")).toHaveClass("custom-class");
  });

  it("should forwards the htmlFor attribute correctly", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);

    expect(screen.getByText("Test Label")).toHaveAttribute("for", "test-input");
  });

  it("should handles click events", async () => {
    const handleClick = vi.fn();

    render(<Label onClick={handleClick}>Clickable Label</Label>);
    
    const label = screen.getByText("Clickable Label");
    await userEvent.click(label);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should renders with additional attributes", () => {
    render(<Label data-testid="test-label">Test Label</Label>);

    expect(screen.getByTestId("test-label")).toBeInTheDocument();
  });

  it("should matches snapshot", () => {
    const { container } = render(<Label>Test Label</Label>);

    expect(container).toMatchSnapshot();
  });
});
