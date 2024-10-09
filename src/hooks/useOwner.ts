import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "@/consts";
import { type TOwner } from "@/types";

export const fetchOwners = (id: number) =>
  fetch(`${API_URL}/owners?id_owner=${id}`).then((res) => res.json());

export default function useOwner(id: number) {
  const { data, refetch, isLoading } = useQuery<TOwner>({
    queryFn: () => fetchOwners(id),
    queryKey: ["owners", id],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return {
    owner: data,
    reloadOwner: refetch,
    ownerLoading: isLoading,
  };
}
