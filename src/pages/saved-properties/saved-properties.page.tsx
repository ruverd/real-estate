import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { useSavedPropertiesQuery } from "@/server/queries/property.query";
import { PropertyCard } from "@/shared/components/property-card/property-card";
import { Button } from "@/shared/components/ui/button";

export const SavedPropertiesPage = () => {
  const { data: properties, isLoading } = useSavedPropertiesQuery();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/" aria-label="Back to home">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Saved Properties</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-[350px] bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Saved Properties</h2>
          <p className="text-muted-foreground mb-6">
            You haven't saved any properties yet. Browse our listings and save properties you're interested in.
          </p>
          <Button asChild>
            <Link to="/">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  );
}; 