import { type TVeterinarian } from "@/types";

export default async function createVeterinarian(
  data: Omit<TVeterinarian, "id_veterinarian" | "pets">
) {
  try {
    const response = await fetch("/api/veterinarians", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al crear el veterinario");
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
