import { useQuery } from "@tanstack/react-query";

import type { Property } from "@/shared/types/property.types";

import { QUERY_KEY_CONSTANTS } from "./query-key.constants";

export const propertiesQuery = async () => {
  const response = await fetch("http://localhost:3000/api/properties");

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const usePropertiesQuery = () => {
  return useQuery<Property[]>({
    queryKey: [QUERY_KEY_CONSTANTS.PROPERTIES],
    queryFn: propertiesQuery,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
};