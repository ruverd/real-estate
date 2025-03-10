import { FilterOption } from './property-filter.types';

export const BEDROOM_OPTIONS: FilterOption[] = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

export const BATHROOM_OPTIONS: FilterOption[] = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

export const PARKING_OPTIONS: FilterOption[] = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
];

export const PRICE_RANGE_OPTIONS: FilterOption[] = [
  { value: 'any', label: 'Any' },
  { value: '100000', label: '$100,000' },
  { value: '200000', label: '$200,000' },
  { value: '300000', label: '$300,000' },
  { value: '400000', label: '$400,000' },
  { value: '500000', label: '$500,000' },
  { value: '600000', label: '$600,000' },
  { value: '700000', label: '$700,000' },
  { value: '800000', label: '$800,000' },
  { value: '900000', label: '$900,000' },
  { value: '1000000', label: '$1,000,000' }
];

export const MAP_TEXTS = {
  FORM: {
    BEDROOMS: {
      FIELD_NAME: "bedrooms",
      LABEL: "Bedrooms",
      PLACEHOLDER: "Any"
    },
    BATHROOMS: {
      FIELD_NAME: "bathrooms",
      LABEL: "Bathrooms",
      PLACEHOLDER: "Any"
    },
    PARKING: {
      FIELD_NAME: "parking",
      LABEL: "Parking",
      PLACEHOLDER: "Any"
    },
    PRICE_MIN: {
      FIELD_NAME: "priceMin",
      LABEL: "Min Price",
      PLACEHOLDER: "Min"
    },
    PRICE_MAX: {
      FIELD_NAME: "priceMax",
      LABEL: "Max Price",
      PLACEHOLDER: "Max"
    },
    SUBMIT: "Search"
  }
};
