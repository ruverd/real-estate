import { useMemo } from "react";
import { Link } from "react-router-dom";

import { usePropertiesQuery } from "@/server/queries/properties.query";
import { PropertyCard } from "@/shared/components/property-card/property-card";
import { Button } from "@/shared/components/ui/button";

import { MAP_TEXTS } from "../../property-detail.constants";

export const RelatedProperties = ({ propertyId }: { propertyId?: string }) => {
  const { data: allProperties } = usePropertiesQuery();

  const relatedProperties = useMemo(() => {
    if (!allProperties || !propertyId) return [];

    return allProperties
      .filter((p) => p.id !== propertyId)
      .sort((a, b) => {
        const aPrice = a.salePrice || 0;
        const bPrice = b.salePrice || 0;
        return bPrice - aPrice;
      })
      .slice(0, 3);
  }, [allProperties, propertyId]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {MAP_TEXTS.RELATED_LISTINGS.TITLE}
        </h2>
        <Button variant="link" className="text-primary" asChild>
          <Link to="/">{MAP_TEXTS.RELATED_LISTINGS.VIEW_ALL}</Link>
        </Button>
      </div>

      {relatedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProperties.map((relatedProperty) => (
            <PropertyCard
              key={`related-${relatedProperty.id}`}
              property={relatedProperty}
              showFeatures={false}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          {MAP_TEXTS.RELATED_LISTINGS.EMPTY}
        </p>
      )}
    </div>
  );
};
