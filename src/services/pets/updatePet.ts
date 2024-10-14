import { TPet } from "@/types";

export default async function updatePet(id: number, data: TData) {
  try {
    const response = await fetch(`/api/pets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al actualizar la mascota");
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

type TData = Partial<
  Omit<TPet, "id_pet" | "owner" | "veterinarian" | "entries">
> & {
  id_owner?: string | number;
  id_veterinarian?: string | number;
};
