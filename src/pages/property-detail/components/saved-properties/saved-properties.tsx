import { useSavedPropertiesQuery } from "@/server/queries/property.query";
import { PropertyCard } from "@/shared/components/property-card";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { MAP_TEXTS } from "../../property-detail.constants";

export const SavedProperties = () => {
  const { data: savedProperties } = useSavedPropertiesQuery();

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {MAP_TEXTS.SAVED_PROPERTIES.TITLE}
        </h2>
        <Button variant="link" className="text-primary" asChild>
          <Link to="/saved-properties">
            {MAP_TEXTS.SAVED_PROPERTIES.VIEW_ALL}
          </Link>
        </Button>
      </div>

      {savedProperties && savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedProperties.slice(0, 3).map((savedProperty) => (
            <PropertyCard
              key={`saved-${savedProperty.id}`}
              property={savedProperty}
              showFeatures={false}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          {MAP_TEXTS.SAVED_PROPERTIES.EMPTY}
        </p>
      )}
    </div>
  );
};
