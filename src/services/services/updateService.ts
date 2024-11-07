import { API_URL } from "@/consts";
import { TService } from "@/types";

const updateService = async (
  id: number,
  data: Partial<TService>
): Promise<boolean> => {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Error al actualizar el servicio");
    return false;
  }

  return true;
};
export default updateService;
