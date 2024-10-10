export default async function deletePet(id: number) {
  try {
    const response = await fetch(`/api/pets/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al eliminar la mascota");
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
