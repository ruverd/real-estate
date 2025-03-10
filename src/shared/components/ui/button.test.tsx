import { render, screen } from "@testing-library/react";
import { Mail } from "lucide-react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

const renderButton = (props?: React.ComponentProps<typeof Button>) => {
  return render(<Button {...props}>{props?.children || "Click me"}</Button>);
};

describe("Button", () => {
  it("should render with default variant", () => {
    renderButton();

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
  });

  it("should render all variants correctly", () => {
    const variants = ["secondary", "outline", "ghost", "link"] as const;

    variants.forEach((variant) => {
      renderButton({ variant, children: `${variant} button` });

      const button = screen.getByRole("button", { name: `${variant} button` });

      expect(button).toBeInTheDocument();
    });
  });

  it("should render all sizes correctly", () => {
    const sizes = ["default", "sm", "lg", "icon"] as const;

    sizes.forEach((size) => {
      renderButton({ size, children: `${size} button` });

      const button = screen.getByRole("button", { name: `${size} button` });

      expect(button).toBeInTheDocument();
    });
  });

  it("should render as disabled", () => {
    renderButton({ disabled: true, children: "Disabled Button" });

    const button = screen.getByRole("button", { name: "Disabled Button" });

    expect(button).toBeDisabled();
  });

  it("should render with icon", () => {
    renderButton({
      children: (
        <>
          <Mail data-testid="mail-icon" />
          With Icon
        </>
      ),
    });

    const button = screen.getByRole("button", { name: "With Icon" });
    const icon = screen.getByTestId("mail-icon");

    expect(button).toContainElement(icon);
  });

  it("should apply custom className", () => {
    const customClass = "custom-class";

    renderButton({ className: customClass, children: "Custom Button" });

    const button = screen.getByRole("button", { name: "Custom Button" });

    expect(button).toHaveClass(customClass);
  });

  it("should render as child component when asChild is true", () => {
    renderButton({ asChild: true, children: <a href="#">Link Button</a> });

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should match snapshot with default variant", () => {
    const { container } = renderButton();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match snapshot with icon and secondary variant", () => {
    const { container } = renderButton({
      variant: "secondary",
      children: (
        <>
          <Mail data-testid="mail-icon" />
          With Icon
        </>
      ),
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match snapshot when disabled", () => {
    const { container } = renderButton({
      disabled: true,
      children: "Disabled Button",
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
