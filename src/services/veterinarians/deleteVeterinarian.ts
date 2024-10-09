export default async function deleteVeterinarian(id: number) {
  try {
    const response = await fetch(`/api/veterinarians/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al eliminar el veterinario");
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
