import type { PartialBy, TOwner } from "@/types";

export default async function createOwner(data: TData) {
  try {
    const response = await fetch("/api/owners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al crear el propietario");
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

type TData = Omit<
  PartialBy<TOwner, "facebook" | "references">,
  "id_owner" | "pets"
>;
