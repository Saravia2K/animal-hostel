export default async function deleteQuestion(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/questions/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la pregunta");
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar la pregunta:", error);
    return false;
  }
}
