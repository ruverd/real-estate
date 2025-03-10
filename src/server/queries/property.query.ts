import { useMutation, useQuery } from "@tanstack/react-query";

import { Property } from "@/shared/types/property.types";

import { QUERY_KEY_CONSTANTS } from "./query-key.constants";

export const usePropertyQuery = (id?: string) => {
  return useQuery<Property>({
    queryKey: [id],
    queryFn: async () => {
      if (!id) throw new Error("Property ID is required");

      const response = await fetch(`http://localhost:3000/api/properties/${id}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    
      return response.json();
    },
    enabled: !!id,
  });
}; 

export const useSavedPropertiesQuery = () => {
  return useQuery<Property[]>({
    queryKey: [QUERY_KEY_CONSTANTS.SAVED_PROPERTIES],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/saved-properties`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
  });
};

export const useSavedPropertyMutation = () => {  
  return useMutation({
    mutationFn: async (propertyId?: string) => {
      const response = await fetch(`http://localhost:3000/api/properties/${propertyId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
    onError: (error) => {
      console.error(error);
    }
  });
};
