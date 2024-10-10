import { API_URL } from "@/consts";
import { TEntry } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchEntries = async (): Promise<TEntry[]> => {
  const response = await fetch(`${API_URL}/entries`);

  if (!response.ok) {
    throw new Error("Error al obtener las entradas");
  }

  return response.json();
};

export default function useEntries() {
  const { data, refetch, isLoading, error } = useQuery<TEntry[]>({
    queryFn: fetchEntries,
    queryKey: ["entries"],
    staleTime: Infinity,
    retry: false,
  });

  return {
    entries: data,
    reloadEntries: refetch,
    entriesLoading: isLoading,
    entriesError: error,
  };
}
