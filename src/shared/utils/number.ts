export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};

export const formatArea = (area: number) => {
  return `${area} sq.ft`;
};

