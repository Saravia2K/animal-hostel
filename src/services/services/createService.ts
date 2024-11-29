import { API_URL } from "@/consts";
import { TService } from "@/types";

export default async function createService(data: TData): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear el servicio");
    }

    return true;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return false;
  }
}

type TData = Omit<TService, "id_service" | "entries">;
