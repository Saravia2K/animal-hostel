import { TEntry } from "@/types";

export default async function updateEntry(id: number, data: TUpdateEntryData) {
  try {
    const response = await fetch(`/api/entries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al actualizar la entrada");
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

export type TUpdateEntryData = Partial<
  Omit<TEntry, "id_entry" | "pet" | "questionnaires" | "services"> & {
    id_pet: number;
    questionnaire: { id_question: number; answer: string }[];
    services: number[];
    notification_seen: boolean;
  }
>;
