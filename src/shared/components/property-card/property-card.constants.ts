import { Bath, BedDouble, Car, Ruler } from "lucide-react";

export const PROPERTY_FEATURES = [
  {
    icon: BedDouble,
    propertyKey: "bedrooms",
    label: "Bedrooms",
  },
  {
    icon: Bath,
    propertyKey: "bathrooms",
    label: "Bathrooms",
  },
  {
    icon: Ruler,
    propertyKey: "sqft",
    label: "Total area",
  },
  {
    icon: Car,
    propertyKey: "parking",
    label: "Parking",
  },
] as const;