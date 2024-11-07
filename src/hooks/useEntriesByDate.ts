import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/consts";
import type { TPet, TService } from "@/types";

export const fetchEntriesByDate = async (
  timestamp: number
): Promise<TResponse[]> => {
  const response = await fetch(`${API_URL}/entries/with-date/${timestamp}`);

  if (!response.ok) {
    throw new Error("Error al obtener las entradas");
  }

  return response.json();
};

export default function useEntriesByDate(date = new Date()) {
  const dayjsDate = dayjs(date);
  const timestamp = dayjsDate.startOf("day").valueOf();

  const { data, refetch, isLoading, error } = useQuery<TResponse[]>({
    queryFn: () => fetchEntriesByDate(timestamp),
    queryKey: ["entries", dayjsDate.format("DD/MM/YYYY")],
    refetchOnMount: "always",
  });

  return {
    entries: data,
    reloadEntries: refetch,
    entriesLoading: isLoading,
    entriesError: error,
  };
}

type TResponse = {
  id_entry: number;
  pet: TPet;
  services: TService[];
  entry_date: string;
  notification_seen: boolean;
};
