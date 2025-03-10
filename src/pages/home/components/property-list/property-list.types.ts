import type { Property } from "@/shared/types/property.types";

export interface PropertyListProps {
  isLoading: boolean;
  error: Error | null;
  properties?: Property[];
}