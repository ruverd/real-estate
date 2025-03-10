import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./sheet";

beforeAll(() => {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
});

describe("Sheet", () => {
  it("should render sheet with trigger and content", async () => {
    const user = userEvent.setup();
    
    render(
      <Sheet>
        <SheetTrigger data-testid="sheet-trigger">Open Sheet</SheetTrigger>
        <SheetContent data-testid="sheet-content">
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <div>Sheet Content</div>
          <SheetFooter>
            <SheetClose data-testid="sheet-close">Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByTestId("sheet-trigger");

    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByTestId("sheet-content")).toBeInTheDocument();
    });

    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
    expect(screen.getByText("Sheet Description")).toBeInTheDocument();
    expect(screen.getByText("Sheet Content")).toBeInTheDocument();
    
    const closeButton = screen.getByTestId("sheet-close");

    await user.click(closeButton);
    
    await waitFor(() => {
      expect(document.querySelector('[data-state="closed"]')).toBeInTheDocument();
    });
  });

  it("should render sheet with different sides", () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <SheetContent side="right" data-testid="sheet-content-right">
          Right Side Content
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByTestId("sheet-content-right")).toHaveClass("right-0");

    rerender(
      <Sheet defaultOpen>
        <SheetContent side="left" data-testid="sheet-content-left">
          Left Side Content
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByTestId("sheet-content-left")).toHaveClass("left-0");

    rerender(
      <Sheet defaultOpen>
        <SheetContent side="top" data-testid="sheet-content-top">
          Top Side Content
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByTestId("sheet-content-top")).toHaveClass("top-0");

    rerender(
      <Sheet defaultOpen>
        <SheetContent side="bottom" data-testid="sheet-content-bottom">
          Bottom Side Content
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByTestId("sheet-content-bottom")).toHaveClass("bottom-0");
  });

  it("should match snapshot", () => {
    const { container } = render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <div>Sheet Content</div>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter> 
        </SheetContent>
      </Sheet>
    );
    
    expect(container).toMatchSnapshot();
  });
});
