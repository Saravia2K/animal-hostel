import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/consts";
import { TPet } from "@/types";

export const fetchPet = async (id: number): Promise<TPet> => {
  const response = await fetch(`${API_URL}/pets?id_pet=${id}`);

  if (!response.ok) {
    throw new Error("No se encontró la mascota");
  }

  return response.json();
};

export default function usePet(id: number) {
  const { data, refetch, isLoading, error } = useQuery<TPet>({
    queryFn: () => fetchPet(id),
    queryKey: ["pets", id],
    staleTime: Infinity,
    retry: false,
  });

  return {
    pet: data,
    reloadPet: refetch,
    petLoading: isLoading,
    petError: error,
  };
}
