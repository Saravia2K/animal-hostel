import { TPet } from "@/types";

export default async function createPet(data: TPet) {
  try {
    const response = await fetch("/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al crear la mascota");
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
