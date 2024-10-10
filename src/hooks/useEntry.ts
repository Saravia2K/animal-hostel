import { API_URL } from "@/consts";
import { TEntry } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchEntry = async (id: number): Promise<TEntry> => {
  const response = await fetch(`${API_URL}/entries?id_entry=${id}`);

  if (!response.ok) {
    throw new Error("No se encontró la entrada");
  }

  return response.json();
};

export default function useEntry(id: number) {
  const { data, refetch, isLoading, error } = useQuery<TEntry>({
    queryFn: () => fetchEntry(id),
    queryKey: ["entries", id],
    staleTime: Infinity,
    retry: false,
  });

  return {
    entry: data,
    reloadEntry: refetch,
    entryLoading: isLoading,
    entryError: error,
  };
}
