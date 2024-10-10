export default async function deleteEntry(id: number) {
  try {
    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al eliminar la entrada");
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
