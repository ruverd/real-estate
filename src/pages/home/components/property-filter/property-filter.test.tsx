import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PropertyFilter } from "./property-filter";
import { PropertyFilterProvider } from "./property-filter-context";

const renderWithContext = () => {
  return render(
    <PropertyFilterProvider>
      <PropertyFilter />
    </PropertyFilterProvider>
  );
};

describe("PropertyFilter", () => {
  it("should renders the property filter component", () => {
    renderWithContext();
    
    expect(screen.getByText('Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Bathrooms')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
