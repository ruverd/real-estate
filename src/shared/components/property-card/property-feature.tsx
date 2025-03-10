import type { PropertyFeatureProps } from "./property-card.types";

export const PropertyFeature = ({ icon: Icon, value, label }: PropertyFeatureProps) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center justify-center gap-1">
      <Icon className="size-5" />
      <span className="text-sm font-medium">{value}</span>
    </div>
    <span className="text-xs font-medium">{label}</span>
  </div>
);