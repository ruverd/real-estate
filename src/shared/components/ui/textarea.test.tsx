import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("should render textarea with default attributes", () => {
    render(<Textarea data-testid="test-textarea" />);
    
    const textarea = screen.getByTestId("test-textarea");
    expect(textarea).toHaveAttribute("data-slot", "textarea");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("should render textarea with custom classes", () => {
    render(<Textarea data-testid="test-textarea" className="w-full h-40 custom-class" />);
    
    const textarea = screen.getByTestId("test-textarea");
    expect(textarea).toHaveClass("w-full");
    expect(textarea).toHaveClass("h-40");
    expect(textarea).toHaveClass("custom-class");
  });

  it("should handle user input", async () => {
    const user = userEvent.setup();
    render(<Textarea data-testid="test-textarea" />);
    
    const textarea = screen.getByTestId("test-textarea");
    await user.type(textarea, "Hello, world!");
    
    expect(textarea).toHaveValue("Hello, world!");
  });

  it("should handle disabled state", () => {
    render(<Textarea data-testid="test-textarea" disabled />);
    
    const textarea = screen.getByTestId("test-textarea");
    expect(textarea).toBeDisabled();
  });

  it("should handle placeholder text", () => {
    render(<Textarea data-testid="test-textarea" placeholder="Enter text here..." />);
    
    const textarea = screen.getByTestId("test-textarea");
    expect(textarea).toHaveAttribute("placeholder", "Enter text here...");
  });

  it("should handle rows and cols attributes", () => {
    render(<Textarea data-testid="test-textarea" rows={10} cols={50} />);
    
    const textarea = screen.getByTestId("test-textarea");
    expect(textarea).toHaveAttribute("rows", "10");
    expect(textarea).toHaveAttribute("cols", "50");
  });

  it("should match snapshot", () => {
    const { container } = render(<Textarea placeholder="Type something..." />);
    expect(container).toMatchSnapshot();
  });
});
