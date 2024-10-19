import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/consts";
import { TPet } from "@/types";
import useLoadingOverlay from "./useLoadingOverlay";

export const fetchPet = async (id: number): Promise<TPet> => {
  const response = await fetch(`${API_URL}/pets?id_pet=${id}`);

  if (!response.ok) {
    throw new Error("No se encontró la mascota");
  }

  return response.json();
};

export default function usePet(id: number) {
  const { show, close, opened } = useLoadingOverlay();
  const { data, refetch, isLoading, error } = useQuery<TPet>({
    queryFn: () => fetchPet(id),
    queryKey: ["pets", id],
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (!opened && isLoading) show();
    if (opened && !isLoading) close();
  }, [isLoading, show, opened, close]);

  return {
    pet: data,
    reloadPet: refetch,
    petLoading: isLoading,
    petError: error,
  };
}
