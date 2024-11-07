import { TQuestion } from "@/types";

export default async function updateQuestion(
  id: number,
  data: Omit<TQuestion, "id_question">
): Promise<boolean> {
  try {
    const response = await fetch(`/api/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la pregunta");
    }

    return true;
  } catch (error) {
    console.error("Error al actualizar la pregunta:", error);
    return false;
  }
}
