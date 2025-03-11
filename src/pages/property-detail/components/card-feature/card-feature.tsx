import { CardFeatureProps } from "./card-feature.types";

export const CardFeature = ({ icon: Icon, title, value }: CardFeatureProps) => {
  return (
    <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
      <Icon className="size-6 mb-2" />
      <span className="font-semibold">{value}</span>
      <span className="text-sm text-foreground/70">{title}</span>
    </div>
  );
};
