import { API_URL } from "@/consts";
import { TService } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchService = async (id: number | string): Promise<TService> => {
  const response = await fetch(`${API_URL}/services/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener el servicio");
  }

  return response.json();
};

export default function useService(id: string | number) {
  const { data, refetch, isLoading, error } = useQuery<TService>({
    queryFn: () => fetchService(id),
    queryKey: ["services", id],
    staleTime: Infinity,
    retry: false,
  });

  return {
    service: data,
    reloadService: refetch,
    serviceLoading: isLoading,
    serviceError: error,
  };
}
