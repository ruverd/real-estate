import { format } from "date-fns";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Bookmark,
  Calendar,
  Car,
  Clock,
  Ruler,
} from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  usePropertyQuery,
  useSavedPropertyMutation,
} from "@/server/queries/property.query";
import { QUERY_KEY_CONSTANTS } from "@/server/queries/query-key.constants";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { isPropertyNew } from "@/shared/utils/date";
import { formatPrice } from "@/shared/utils/number";
import { cn } from "@/shared/utils/style";

import { useQueryClient } from "@tanstack/react-query";
import { CardFeature } from "./components/card-feature";
import { ContactForm } from "./components/contact-form";
import { PropertyDetailSkeleton } from "./components/property-detail-skeleton";
import { PropertyError } from "./components/property-error";
import { PropertyMap } from "./components/property-map";
import { RelatedProperties } from "./components/related-properties";
import { SavedProperties } from "./components/saved-properties";
import { MAP_TEXTS } from "./property-detail.constants";

export const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, error } = usePropertyQuery(id);

  const savePropertyMutation = useSavedPropertyMutation();
  const queryClient = useQueryClient();

  const isSaved = useMemo(() => property?.saved, [property]);
  const isNew = useMemo(
    () => isPropertyNew(property?.dateListed || ""),
    [property]
  );
  const formattedPrice = useMemo(
    () => formatPrice(property?.salePrice || 0),
    [property]
  );
  const formattedDateListed = useMemo(
    () =>
      property?.dateListed
        ? format(new Date(property.dateListed), "MMMM d, yyyy")
        : "N/A",
    [property]
  );

  const handleSaveProperty = async () => {
    if (!property?.id) return;

    const result = await savePropertyMutation.mutateAsync(property.id);

    if (result) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CONSTANTS.SAVED_PROPERTIES],
      });
      queryClient.invalidateQueries({ queryKey: [property.id] });
    }

    toast.success(
      isSaved ? MAP_TEXTS.UNSAVE_SUCCESS.TITLE : MAP_TEXTS.SAVE_SUCCESS.TITLE,
      {
        description: isSaved
          ? MAP_TEXTS.UNSAVE_SUCCESS.DESCRIPTION
          : MAP_TEXTS.SAVE_SUCCESS.DESCRIPTION,
      }
    );
  };

  if (isLoading) {
    return <PropertyDetailSkeleton />;
  }

  if (error || !property) {
    return (
      <PropertyError
        errorMessage={
          error instanceof Error ? error.message : MAP_TEXTS.ERROR.DEFAULT
        }
      />
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/" aria-label={MAP_TEXTS.BACK_BUTTON_ARIA_LABEL}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">{MAP_TEXTS.PAGE_TITLE}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative">
            {isNew && (
              <Badge variant="secondary" className="absolute top-4 left-4 z-10">
                {MAP_TEXTS.PROPERTY_BADGE.NEW}
              </Badge>
            )}
            <img
              src={property.pictureUrl}
              alt={property.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          <div className="mt-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <p className="text-lg text-foreground/80 mt-1">
                {property.location}
              </p>
              <p className="text-2xl font-semibold mt-4">{formattedPrice}</p>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleSaveProperty}
              aria-label={
                isSaved ? MAP_TEXTS.UNSAVE_BUTTON : MAP_TEXTS.SAVE_BUTTON
              }
            >
              <Bookmark className={cn("size-4", isSaved && "fill-primary")} />
              {isSaved ? MAP_TEXTS.UNSAVE_BUTTON : MAP_TEXTS.SAVE_BUTTON}
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <CardFeature
              icon={BedDouble}
              title={MAP_TEXTS.PROPERTY_FEATURES.BEDROOMS}
              value={property.bedrooms.toString()}
            />
            <CardFeature
              icon={Bath}
              title={MAP_TEXTS.PROPERTY_FEATURES.BATHROOMS}
              value={property.bathrooms.toString()}
            />
            <CardFeature
              icon={Car}
              title={MAP_TEXTS.PROPERTY_FEATURES.PARKING}
              value={property.parking.toString()}
            />
            <CardFeature
              icon={Ruler}
              title={MAP_TEXTS.PROPERTY_FEATURES.SQFT}
              value={property.sqft.toString()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <CardFeature
              icon={Calendar}
              title={MAP_TEXTS.PROPERTY_FEATURES.YEAR_BUILT_DEFAULT}
              value={
                property.yearBuilt?.toString() ||
                MAP_TEXTS.PROPERTY_FEATURES.YEAR_BUILT_DEFAULT
              }
            />
            <CardFeature
              icon={Clock}
              title={MAP_TEXTS.PROPERTY_FEATURES.DATE_LISTED}
              value={formattedDateListed}
            />
          </div>

          <h2 className="text-xl font-semibold mb-4">
            {MAP_TEXTS.PROPERTY_DESCRIPTION.TITLE}
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            {property.description || MAP_TEXTS.PROPERTY_DESCRIPTION.DEFAULT}
          </p>

          <SavedProperties />
          <RelatedProperties propertyId={property.id} />
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div className="sticky top-24 bg-muted/30 p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">
                {MAP_TEXTS.CONTACT_AGENT.TITLE}
              </h3>
              <p className="mb-6 text-foreground/70">
                {MAP_TEXTS.CONTACT_AGENT.DESCRIPTION}
              </p>

              <ContactForm />
              <PropertyMap property={property} className="mt-6 pt-6 border-t" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
