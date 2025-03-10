import { Property } from '@/shared/types/property.types';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { PropertyFilterValues } from './property-filter.types';

interface PropertyFilterContextType {
  filters: PropertyFilterValues;
  filteredProperties: Property[] | undefined;
  setFilters: (filters: PropertyFilterValues) => void;
  setAllProperties: (properties: Property[] | undefined) => void;
}

const PropertyFilterContext = createContext<PropertyFilterContextType | undefined>(undefined);

interface PropertyFilterProviderProps {
  children: ReactNode;
}

export const PropertyFilterProvider = ({ children }: PropertyFilterProviderProps) => {
  const [filters, setFilters] = useState<PropertyFilterValues>({
    bedrooms: 'any',
    bathrooms: 'any',
    parking: 'any',
    priceMin: 'any',
    priceMax: 'any',
  });
  
  const [allProperties, setAllProperties] = useState<Property[] | undefined>(undefined);

  const filteredProperties = useMemo(() => {
    if (!allProperties) return undefined;
    
    return allProperties.filter(property => {

      if (filters.bedrooms !== 'any' && property.bedrooms < parseInt(filters.bedrooms)) {
        return false;
      }
      
      if (filters.bathrooms !== 'any' && property.bathrooms < parseInt(filters.bathrooms)) {
        return false;
      }
      
      if (filters.parking !== 'any' && property.parking < parseInt(filters.parking)) {
        return false;
      }
      
      const price = property.salePrice;

      if (filters.priceMin !== 'any' && price < parseInt(filters.priceMin)) {
        return false;
      }
      
      if (filters.priceMax !== 'any' && price > parseInt(filters.priceMax)) {
        return false;
      }
      
      return true;
    });
  }, [allProperties, filters]);

  const value = {
    filters,
    setFilters,
    filteredProperties,
    setAllProperties,
  };

  return (
    <PropertyFilterContext.Provider value={value}>
      {children}
    </PropertyFilterContext.Provider>
  );
};

export const usePropertyFilter = () => {
  const context = useContext(PropertyFilterContext);
  if (context === undefined) {
    throw new Error('usePropertyFilter must be used within a PropertyFilterProvider');
  }
  return context;
}; 