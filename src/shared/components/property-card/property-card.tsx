import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { isPropertyNew } from "@/shared/utils/date";
import { formatPrice } from "@/shared/utils/number";

import { Separator } from "../ui/separator";
import { PROPERTY_FEATURES } from "./property-card.constants";
import type { PropertyCardProps } from "./property-card.types";
import { PropertyFeature } from "./property-feature";

export function PropertyCard({ property, showFeatures = true }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  const renderNewTag = useMemo(() => {
    const showNewTag = isPropertyNew(property.dateListed);
    
    if (showNewTag) {
      return <Badge variant="secondary" className="absolute top-4 left-4">New</Badge>;
    }
    
    return null;
  }, [property.dateListed]);
  
  const formattedPrice = useMemo(() => formatPrice(property.salePrice), [property.salePrice]);
  
  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
      tabIndex={0}
      role="article"
      aria-label={`${property.title} in ${property.location} for ${formattedPrice}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <CardHeader className="relative p-0">
        {!imageLoaded && !imageError && (
          <div className="w-full h-[200px] bg-muted animate-pulse" data-testid="loading-placeholder" />
        )}
        {imageError && (
          <div className="w-full h-[200px] bg-muted flex items-center justify-center">
            <span className="text-muted-foreground" data-testid="image-error-message">Image not available</span>
          </div>
        )}
        <img 
          src={property.thumbnailUrl} 
          alt={property.title}
          className={`w-full h-[200px] object-cover ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {renderNewTag}
      </CardHeader>

      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-foreground truncate">{property.title}</h3>
          <p className="text-sm font-display text-foreground/80 truncate">{property.location}</p>
        </div>
        <span className="text-xl font-display font-semibold">{formattedPrice}</span>
        {showFeatures && <Separator className="mt-2" />}
      </CardContent>
      
      {showFeatures && (
        <CardFooter className="px-4 pt-0 pb-4 grid grid-cols-4 gap-2 text-sm text-foreground/80 w-full">
          {PROPERTY_FEATURES.map((feature) => (
            <PropertyFeature
              key={feature.propertyKey}
              icon={feature.icon}
              value={property[feature.propertyKey]}
              label={feature.label}
            />
          ))}
        </CardFooter>
      )}
    </Card>
  );
}