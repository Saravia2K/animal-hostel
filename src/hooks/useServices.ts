import { API_URL } from "@/consts";
import { TService } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchServices = async (): Promise<TService[]> => {
  const response = await fetch(`${API_URL}/services`);

  if (!response.ok) {
    throw new Error("Error al obtener los servicios");
  }

  return response.json();
};

export default function useServices() {
  const { data, refetch, isLoading, error } = useQuery<TService[]>({
    queryFn: fetchServices,
    queryKey: ["services"],
    staleTime: Infinity,
    retry: false,
  });

  return {
    services: data,
    reloadServices: refetch,
    servicesLoading: isLoading,
    servicesError: error,
  };
}
