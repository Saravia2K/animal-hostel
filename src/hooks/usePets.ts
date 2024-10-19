import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/consts";
import { TPet } from "@/types";

export const fetchPets = async (): Promise<TPet[]> => {
  const response = await fetch(`${API_URL}/pets`);

  if (!response.ok) {
    throw new Error("Error al obtener las mascotas");
  }

  return response.json();
};

export default function usePets() {
  const { data, refetch, isLoading, error } = useQuery<TPet[]>({
    queryFn: fetchPets,
    queryKey: ["pets"],
    staleTime: Infinity,
    retry: false,
  });

  return {
    pets: data,
    reloadPets: refetch,
    petsLoading: isLoading,
    petsError: error,
  };
}
