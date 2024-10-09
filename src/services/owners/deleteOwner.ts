export default async function deleteOwner(id: number) {
  try {
    const response = await fetch(`/api/owners/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error al eliminar el propietario");
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
