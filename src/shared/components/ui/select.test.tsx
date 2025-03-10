import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "./select";

beforeAll(() => {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
});

describe("Select", () => {
  it("should render select with trigger and items", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    
    render(
      <Select onValueChange={handleValueChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");

    expect(trigger).toBeInTheDocument();
    expect(screen.getByText("Select an option")).toBeInTheDocument();

    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Fruits")).toBeInTheDocument();
    });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Orange")).toBeInTheDocument();

    await user.click(screen.getByText("Banana"));

    expect(handleValueChange).toHaveBeenCalledWith("banana");
  });

  it("should render disabled select item", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    
    render(
      <Select onValueChange={handleValueChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana" disabled>Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByTestId("select-trigger"));

    await waitFor(() => {
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    const bananaItem = screen.getByText("Banana").closest('[role="option"]');
    expect(bananaItem).toHaveAttribute("aria-disabled", "true");
    
    await user.click(bananaItem as Element);
    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it("should render select with separator", async () => {
    const user = userEvent.setup();
    
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value="item1">Item 1</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Group 2</SelectLabel>
            <SelectItem value="item2">Item 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByTestId("select-trigger"));

    await waitFor(() => {
      expect(screen.getByText("Group 1")).toBeInTheDocument();
    });

    const separator = document.querySelector('[data-slot="select-separator"]');
    expect(separator).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    );
    
    expect(container).toMatchSnapshot();
  });
});
