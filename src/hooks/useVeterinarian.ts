import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/consts";
import { type TVeterinarian } from "@/types";

export const fetchVeterinarian = async (id: number) => {
  const response = await fetch(
    `${API_URL}/veterinarians?id_veterinarian=${id}`
  );

  if (!response.ok) {
    throw new Error("No se encontró el veterinario");
  }

  return response.json();
};

export default function useVeterinarian(id: number) {
  const { data, refetch, isLoading, error } = useQuery<TVeterinarian>({
    queryFn: () => fetchVeterinarian(id),
    queryKey: ["veterinarians", id],
    staleTime: Infinity,
    retry: false,
  });

  return {
    veterinarian: data,
    reloadVeterinarian: refetch,
    veterinarianLoading: isLoading,
    veterinarianError: error,
  };
}
