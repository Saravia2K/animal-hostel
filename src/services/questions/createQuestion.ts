import { TQuestion } from "@/types";

export default async function createQuestion(
  data: Omit<TQuestion, "id_question">
): Promise<boolean> {
  try {
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear la pregunta");
    }

    return true;
  } catch (error) {
    console.error("Error al crear la pregunta:", error);
    return false;
  }
}
