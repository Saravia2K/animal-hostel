import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/consts";
import { TOwner } from "@/types";

export const fetchOwner = async (id: number) => {
  const response = await fetch(`${API_URL}/owners?id_owner=${id}`);
  if (!response.ok) {
    throw new Error("No se encontró el propietario");
  }
  return response.json();
};

export default function useOwner(id: number) {
  const { data, refetch, isLoading, error } = useQuery<TOwner>({
    queryFn: () => fetchOwner(id),
    queryKey: ["owners", id],
    staleTime: Infinity,
    retry: false,
  });

  return {
    owner: data,
    reloadOwner: refetch,
    ownerLoading: isLoading,
    ownerError: error,
  };
}
