import { API_URL } from "@/consts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type TOwner } from "@/types";

export const fetchOwners = () =>
  fetch(`${API_URL}/owners`).then((res) => res.json());

export default function useOwners() {
  const { data, refetch, isLoading } = useQuery<TOwner[]>({
    queryFn: fetchOwners,
    queryKey: ["owners"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return {
    owners: data,
    reloadOwners: refetch,
    ownersLoading: isLoading,
  };
}
