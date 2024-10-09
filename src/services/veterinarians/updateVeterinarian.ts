import { type TVeterinarian } from "@/types";

export default async function updateVeterinarian(
  id: number,
  data: Partial<TVeterinarian>
) {
  try {
    const response = await fetch(`/api/veterinarians/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al actualizar el veterinario");
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
