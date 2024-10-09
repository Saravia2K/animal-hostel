import { API_URL } from "@/consts";
import { type TVeterinarian } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchVeterinarians = async (): Promise<TVeterinarian[]> => {
  const response = await fetch(`${API_URL}/veterinarians`);

  if (!response.ok) {
    throw new Error("Error al obtener los veterinarios");
  }

  return response.json();
};

export default function useVeterinarians() {
  const { data, refetch, isLoading, error } = useQuery<TVeterinarian[]>({
    queryFn: fetchVeterinarians,
    queryKey: ["veterinarians"],
    staleTime: Infinity,
    retry: false,
  });

  return {
    veterinarians: data,
    reloadVeterinarians: refetch,
    veterinariansLoading: isLoading,
    veterinariansError: error,
  };
}
