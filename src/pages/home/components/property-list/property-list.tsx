import { useEffect } from "react";

import { PropertyCard, PropertyCardSkeleton } from "@/shared/components/property-card";

import { usePropertyFilter } from "../../components/property-filter";
import { MAP_TEXTS } from "./property-list.constants";
import type { PropertyListProps } from "./property-list.types";

export const PropertyList = ({properties, isLoading, error}: PropertyListProps) => {
  const { filteredProperties, setAllProperties } = usePropertyFilter();
  
  useEffect(() => {
    if (properties) {
      setAllProperties(properties);
    }
  }, [properties, setAllProperties]);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="property-list-loading">
        {Array.from({ length: 3 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md" data-testid="property-list-error">
        {MAP_TEXTS.errorTitle} {error instanceof Error ? error.message : MAP_TEXTS.unknownError}
      </div>
    )
  }

  const displayProperties = filteredProperties || properties;
  
  if (displayProperties && displayProperties.length === 0) {
    return (
      <div className="col-span-full text-center p-8 border border-gray-200 rounded-md" data-testid="property-list-empty">
        {MAP_TEXTS.noProperties}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="property-list-container">
      {displayProperties?.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};