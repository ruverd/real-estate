import { render } from "@testing-library/react";

import { Separator } from "./separator";

describe("Separator", () => {
  it("should renders horizontal separator by default", () => {
    const { container } = render(<Separator />);
    
    const separator = container.querySelector('[data-slot="separator-root"]');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
  });

  it("should renders vertical separator when orientation is set to vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    
    const separator = container.querySelector('[data-slot="separator-root"]');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });

  it("should applies custom className", () => {
    const { container } = render(<Separator className="custom-class" />);
    
    const separator = container.querySelector('[data-slot="separator-root"]');

    expect(separator).toHaveClass("custom-class");
  });

  it("should match snapshot", () => {
    const { container } = render(<Separator />);

    expect(container).toMatchSnapshot();
  });
});
