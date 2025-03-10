import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

const renderInput = (props: React.ComponentProps<typeof Input>) => render(<Input {...props} />);

describe("Input", () => {
  it("should render input element correctly", () => {
    renderInput({ placeholder: "Enter text" });
    
    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeInTheDocument();
  });

  it("should apply specified type attribute", () => {
    renderInput({ type: "password", placeholder: "Password field" });
    
    const input = screen.getByPlaceholderText("Password field");

    expect(input).toHaveAttribute("type", "password");
  });

  it("should handle value changes", () => {
    renderInput({ placeholder: "Test input" });
    
    const input = screen.getByPlaceholderText("Test input") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "New value" } });
    
    expect(input.value).toBe("New value");
  });

  it("should apply custom className", () => {
    renderInput({ className: "custom-class", placeholder: "Custom class" });
    
    const input = screen.getByPlaceholderText("Custom class");

    expect(input).toHaveClass("custom-class");
  });

  it("should handle disabled state", () => {
    renderInput({ disabled: true, placeholder: "Disabled input" });
    
    const input = screen.getByPlaceholderText("Disabled input");

    expect(input).toBeDisabled();
  });

  it("should apply aria-invalid attribute", () => {
    renderInput({ "aria-invalid": "true", placeholder: "Invalid input" });
    
    const input = screen.getByPlaceholderText("Invalid input");

    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should handle additional props", () => {
    renderInput({ placeholder: "Additional props", maxLength: 10, required: true });
    
    const input = screen.getByPlaceholderText("Additional props");

    expect(input).toHaveAttribute("maxLength", "10");
    expect(input).toHaveAttribute("required");
  });

  it("should handle file input type", () => {
    renderInput({ type: "file", placeholder: "File input" });
    
    const input = screen.getByPlaceholderText("File input");

    expect(input).toHaveAttribute("type", "file");
  });

  it("should match snapshot", () => {
    const { container } = render(
      <Input 
        placeholder="Snapshot test" 
        className="test-class"
        type="text"
      />
    );
    
    expect(container).toMatchSnapshot();
  });
});
