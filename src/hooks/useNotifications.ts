import { API_URL } from "@/consts";
import { TNotification } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchNotifications = async (): Promise<TNotification[]> => {
  const response = await fetch(`${API_URL}/notifications`);

  if (!response.ok) {
    throw new Error("Error al obtener las notificaciones");
  }

  return response.json();
};

export default function useNotifications() {
  const { data, refetch, isLoading, error } = useQuery<TNotification[]>({
    queryFn: fetchNotifications,
    queryKey: ["notifications"],
    staleTime: Infinity,
    retry: false,
  });

  return {
    notifications: data,
    reloadNotifications: refetch,
    notificationsLoading: isLoading,
    notificationsError: error,
  };
}
