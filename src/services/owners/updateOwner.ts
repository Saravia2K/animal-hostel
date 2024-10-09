import { TOwner } from "@/types";

export default async function updateOwner(id: number, data: TOwner) {
  try {
    const response = await fetch(`/api/owners/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al actualizar el propietario");
      }
      return false;
    }

    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", error);
    }
    return false;
  }
}
