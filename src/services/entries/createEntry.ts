import { TEntry } from "@/types";

export default async function createEntry(data: TData) {
  try {
    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al crear la entrada");
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
  TEntry,
  "id_entry" | "pet" | "questionnaires" | "services"
> & {
  id_pet: number;
  questionnaires: { id_question: number; answer: string }[];
  services: number[];
};
