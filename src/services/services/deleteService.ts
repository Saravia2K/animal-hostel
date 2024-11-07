import { API_URL } from "@/consts";

export const deleteService = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("Error al eliminar el servicio");
    return false;
  }

  return true;
};
