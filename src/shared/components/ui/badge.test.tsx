import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./badge";

const renderBadge = (props?: React.ComponentProps<typeof Badge>) => {
  return render(<Badge {...props}>Test Badge</Badge>);
};

describe("Badge", () => {
  it("should render with default variant", () => {
    renderBadge();

    const badge = screen.getByText("Test Badge");

    expect(badge).toBeInTheDocument();
  });

  it("should render with outline variant", () => {
    renderBadge({ variant: "outline" });

    const badge = screen.getByText("Test Badge");

    expect(badge).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const customClass = "custom-class";

    renderBadge({ className: customClass });

    const badge = screen.getByText("Test Badge");

    expect(badge).toHaveClass(customClass);
  });

  it("should match snapshot with default variant", () => {
    const { container } = renderBadge();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match snapshot with outline variant", () => {
    const { container } = renderBadge({ variant: "outline" });

    expect(container.firstChild).toMatchSnapshot();
  });
});
