import type { Property } from "@/shared/types/property.types";
import type { LucideIcon } from "lucide-react";

export type PropertyFeatureOptions = 'bedrooms' | 'bathrooms' | 'sqft' | 'parking';

export type PropertyFeature = {
  icon: LucideIcon;
  propertyKey: PropertyFeatureOptions;
  label: string;
}

export interface PropertyFeatureProps extends Omit<PropertyFeature, 'propertyKey'> {
  value: string | number;
}

export interface PropertyCardProps {
  property: Property;
  showFeatures?: boolean;
  className?: string;
}