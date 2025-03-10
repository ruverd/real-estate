import { z } from 'zod';

export type FilterOption = {
  value: string;
  label: string;
};

export const PropertyFilterSchema = z.object({
  bedrooms: z.string(),
  bathrooms: z.string(),
  parking: z.string(),
  priceMin: z.string(),
  priceMax: z.string(),
}).refine(data => {
  // Skip validation if either value is 'any'
  if (data.priceMin === 'any' || data.priceMax === 'any') {
    return true;
  }
  
  // Ensure min price is less than max price
  return parseInt(data.priceMin) < parseInt(data.priceMax);
}, {
  message: "Minimum price must be less than maximum price",
  path: ["priceMax"]
});

export type PropertyFilterValues = z.infer<typeof PropertyFilterSchema>;
