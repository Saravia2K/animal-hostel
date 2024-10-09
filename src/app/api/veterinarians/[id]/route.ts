import { NextResponse } from "next/server";
import prisma from "../../prisma";

export async function PUT(req: Request, { params }: { params: TParams }) {
  const id_veterinarian = parseInt(params.id);

  try {
    const body = await req.json();
    const { names, last_names, clinic_name, cellphone } = body;

    const updatedVeterinarian = await prisma.veterinarian.update({
      where: { id_veterinarian },
      data: {
        names,
        last_names,
        clinic_name,
        cellphone,
      },
    });

    return NextResponse.json(updatedVeterinarian);
  } catch (error) {
    console.error("Error updating veterinarian:", error);
    return NextResponse.json(
      { message: "Error al actualizar el veterinario" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: TParams }) {
  const id_veterinarian = parseInt(params.id);

  try {
    await prisma.veterinarian.delete({
      where: { id_veterinarian },
    });

    return NextResponse.json({ message: "Veterinario eliminado exitosamente" });
  } catch (error) {
    console.error("Error deleting veterinarian:", error);
    return NextResponse.json(
      { message: "Error al eliminar el veterinario" },
      { status: 500 }
    );
  }
}

type TParams = {
  id: string;
};
