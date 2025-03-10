import { cn } from "@/shared/utils/style";

import { MAP_TEXTS } from "../../property-detail.constants";
import type { PropertyMapProps } from "./property-map.types";

export const PropertyMap = ({ property, className }: PropertyMapProps) => {
  return (
    <div className={cn(className)}>
      <h3 className="text-xl font-semibold mb-4">{MAP_TEXTS.PROPERTY_LOCATION.TITLE}</h3>
      <div className="aspect-square w-full overflow-hidden rounded-md">
        <iframe
          title={MAP_TEXTS.PROPERTY_LOCATION.TITLE}
          className="w-full h-full border-0"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`${MAP_TEXTS.PROPERTY_LOCATION.MAP_ARIA_LABEL} ${property.title}`}
        />
      </div>
    </div>
  );
};
