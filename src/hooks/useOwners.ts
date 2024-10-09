import { API_URL } from "@/consts";
import { TOwner } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchOwners = async (): Promise<TOwner[]> => {
  const response = await fetch(`${API_URL}/owners`);

  if (!response.ok) {
    throw new Error("Error al obtener los propietarios");
  }

  return response.json();
};

export default function useOwners() {
  const { data, refetch, isLoading, error } = useQuery<TOwner[]>({
    queryFn: fetchOwners,
    queryKey: ["owners"],
    staleTime: Infinity,
    retry: false,
  });

  return {
    owners: data,
    reloadOwners: refetch,
    ownersLoading: isLoading,
    ownersError: error,
  };
}
