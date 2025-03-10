import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { PropertyFilterProvider } from "../property-filter";
import { PropertyList } from "./property-list";

vi.mock("../property-filter", async () => {
  const actual = await vi.importActual("../property-filter");
  return {
    ...actual,
    usePropertyFilter: () => ({
      filters: {},
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
    }),
  };
});

const setup = (props = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PropertyFilterProvider>
            <PropertyList isLoading={false} error={null} {...props} />
          </PropertyFilterProvider>
        </BrowserRouter>
      </QueryClientProvider>
    ),
  };
};

describe("PropertyList", () => {
  it("should renders loading state initially", async () => {
    setup({ isLoading: true });

    expect(screen.getByTestId('property-list-loading')).toBeInTheDocument();
  });

  it("should renders error state when data is not loaded", async () => {
    setup({ error: new Error("Failed to fetch properties") });

    expect(screen.getByTestId('property-list-error')).toBeInTheDocument();
  });
});
