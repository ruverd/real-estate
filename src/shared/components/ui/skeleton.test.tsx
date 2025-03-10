import { render } from "@testing-library/react";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("should render skeleton with default classes", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    
    expect(skeleton).toHaveAttribute("data-slot", "skeleton");
    expect(skeleton).toHaveClass("bg-primary/10");
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("rounded-md");
  });

  it("should render skeleton with custom classes", () => {
    const { container } = render(<Skeleton className="w-20 h-20 bg-red-500" />);
    const skeleton = container.firstChild;
    
    expect(skeleton).toHaveClass("w-20");
    expect(skeleton).toHaveClass("h-20");
    expect(skeleton).toHaveClass("bg-red-500");
  });

  it("should render skeleton with custom attributes", () => {
    const { container } = render(<Skeleton data-testid="test-skeleton" aria-label="Loading" />);
    const skeleton = container.firstChild;
    
    expect(skeleton).toHaveAttribute("data-testid", "test-skeleton");
    expect(skeleton).toHaveAttribute("aria-label", "Loading");
  });

  it("should match snapshot", () => {
    const { container } = render(<Skeleton className="w-40 h-10" />);
    expect(container).toMatchSnapshot();
  });
});
