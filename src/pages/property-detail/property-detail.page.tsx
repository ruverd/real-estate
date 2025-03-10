import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, Bath, BedDouble, Bookmark, Calendar, Car, Clock, Ruler } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { usePropertiesQuery } from "@/server/queries/properties.query";
import { usePropertyQuery, useSavedPropertiesQuery, useSavedPropertyMutation } from "@/server/queries/property.query";
import { PropertyCard } from "@/shared/components/property-card/property-card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";
import { isPropertyNew } from "@/shared/utils/date";
import { formatPrice } from "@/shared/utils/number";
import { cn } from "@/shared/utils/style";

import { QUERY_KEY_CONSTANTS } from "@/server/queries/query-key.constants";
import { useQueryClient } from "@tanstack/react-query";
import { PropertyDetailSkeleton } from "./components/property-detail-skeleton";
import { PropertyMap } from "./components/property-map";
import { MAP_TEXTS } from "./property-detail.constants";
import { contactFormSchema } from "./property-detail.schema";
import type { ContactFormValues } from "./property-detail.types";

export const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, error } = usePropertyQuery(id);
  const { data: allProperties } = usePropertiesQuery();
  const { data: savedProperties, isLoading: isSavedPropertiesLoading } = useSavedPropertiesQuery();
  const savePropertyMutation = useSavedPropertyMutation();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      [MAP_TEXTS.CONTACT_AGENT.FORM.NAME.FIELD_NAME]: "",
      [MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.FIELD_NAME]: "",
      [MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.FIELD_NAME]: "",
      [MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.FIELD_NAME]: "",
    },
  });

  const isSaved = useMemo(() => property?.saved, [property]);
  const isNew = useMemo(() => isPropertyNew(property?.dateListed || ""), [property]);
  const formattedPrice = useMemo(() => formatPrice(property?.salePrice || 0), [property]);
  const formattedDateListed = useMemo(() => property?.dateListed ? format(new Date(property.dateListed), "MMMM d, yyyy") : "N/A", [property]);

  const handleSaveProperty = async () => {
    if (!property?.id) return;

    const result = await savePropertyMutation.mutateAsync(property.id);

    if (result) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONSTANTS.SAVED_PROPERTIES] });
      queryClient.invalidateQueries({ queryKey: [property.id] });
    }

    console.log("result savePropertyMutation", result);

    toast.success(isSaved ? MAP_TEXTS.UNSAVE_SUCCESS.TITLE : MAP_TEXTS.SAVE_SUCCESS.TITLE, {
      description: isSaved ? MAP_TEXTS.UNSAVE_SUCCESS.DESCRIPTION : MAP_TEXTS.SAVE_SUCCESS.DESCRIPTION,
    });
  };

  const onSubmit = (data: ContactFormValues) => {
    toast.success(MAP_TEXTS.CONTACT_SUCCESS.TITLE, {
      description: MAP_TEXTS.CONTACT_SUCCESS.DESCRIPTION,
    });
    console.log(data);
    form.reset();
  };

  const relatedProperties = useMemo(() => {
    if (!allProperties || !property) return [];
    
    return allProperties
      .filter(p => 
        p.id !== property.id)
      .sort((a, b) => {
        const aPrice = a.salePrice || 0;
        const bPrice = b.salePrice || 0;
        return bPrice - aPrice;
      })
      .slice(0, 3);
      
  }, [allProperties, property]);

  if (isLoading || isSavedPropertiesLoading) {
    return (
      <PropertyDetailSkeleton />
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto py-8">
        <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
          {error instanceof Error ? error.message : MAP_TEXTS.ERROR.DEFAULT}
        </div>
      </div>
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
              <p className="text-lg text-foreground/80 mt-1">{property.location}</p>
              <p className="text-2xl font-semibold mt-4">{formattedPrice}</p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSaveProperty}
              aria-label={isSaved ? MAP_TEXTS.UNSAVE_BUTTON  : MAP_TEXTS.SAVE_BUTTON}
            >
              <Bookmark className={cn("size-4", isSaved && "fill-primary")} />
              {isSaved ? MAP_TEXTS.UNSAVE_BUTTON : MAP_TEXTS.SAVE_BUTTON}
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <BedDouble className="size-6 mb-2" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-sm text-foreground/70">{MAP_TEXTS.PROPERTY_FEATURES.BEDROOMS}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Bath className="size-6 mb-2" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-sm text-foreground/70">{MAP_TEXTS.PROPERTY_FEATURES.BATHROOMS}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Car className="size-6 mb-2" />
              <span className="font-semibold">{property.parking}</span>
              <span className="text-sm text-foreground/70">{MAP_TEXTS.PROPERTY_FEATURES.PARKING}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Ruler className="size-6 mb-2" />
              <span className="font-semibold">{property.sqft}</span>
              <span className="text-sm text-foreground/70">{MAP_TEXTS.PROPERTY_FEATURES.SQFT}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Calendar className="size-6 mb-2" />
              <span className="font-semibold">{property.yearBuilt || MAP_TEXTS.PROPERTY_FEATURES.YEAR_BUILT_DEFAULT}</span>
              <span className="text-sm text-foreground/70">{MAP_TEXTS.PROPERTY_FEATURES.YEAR_BUILT}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Clock className="size-6 mb-2" />
              <span className="font-semibold">{formattedDateListed}</span>
              <span className="text-sm text-foreground/70">{MAP_TEXTS.PROPERTY_FEATURES.DATE_LISTED}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">{MAP_TEXTS.PROPERTY_DESCRIPTION.TITLE}</h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            {property.description || MAP_TEXTS.PROPERTY_DESCRIPTION.DEFAULT}
          </p>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{MAP_TEXTS.SAVED_PROPERTIES.TITLE}</h2>
              <Button variant="link" className="text-primary" asChild>
                <Link to="/saved-properties">{MAP_TEXTS.SAVED_PROPERTIES.VIEW_ALL}</Link>
              </Button>
            </div>
            
            {savedProperties && savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savedProperties.slice(0, 3).map(savedProperty => (
                  <PropertyCard key={`saved-${savedProperty.id}`} property={savedProperty} showFeatures={false} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{MAP_TEXTS.SAVED_PROPERTIES.EMPTY}</p>
            )}
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{MAP_TEXTS.RELATED_LISTINGS.TITLE}</h2>
              <Button variant="link" className="text-primary" asChild>
                <Link to="/">{MAP_TEXTS.RELATED_LISTINGS.VIEW_ALL}</Link>
              </Button>
            </div>
            
            {relatedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProperties.map(relatedProperty => (
                  <PropertyCard key={`related-${relatedProperty.id}`} property={relatedProperty} showFeatures={false} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{MAP_TEXTS.RELATED_LISTINGS.EMPTY}</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div className="sticky top-24 bg-muted/30 p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">{MAP_TEXTS.CONTACT_AGENT.TITLE}</h3>
              <p className="mb-6 text-foreground/70">
                {MAP_TEXTS.CONTACT_AGENT.DESCRIPTION}
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name={MAP_TEXTS.CONTACT_AGENT.FORM.NAME.FIELD_NAME}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{MAP_TEXTS.CONTACT_AGENT.FORM.NAME.LABEL}</FormLabel>
                        <FormControl>
                          <Input placeholder={MAP_TEXTS.CONTACT_AGENT.FORM.NAME.PLACEHOLDER} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.FIELD_NAME}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.LABEL}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.PLACEHOLDER} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.FIELD_NAME}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.LABEL}</FormLabel>
                        <FormControl>
                          <Input placeholder={MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.PLACEHOLDER} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.FIELD_NAME}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.LABEL}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.PLACEHOLDER} 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    {MAP_TEXTS.CONTACT_AGENT.FORM.SUBMIT_BUTTON}
                  </Button>
                </form>
              </Form>
              
              <PropertyMap property={property} className="mt-6 pt-6 border-t" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 