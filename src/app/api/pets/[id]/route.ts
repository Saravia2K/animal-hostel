import { NextResponse } from "next/server";
import prisma from "../../prisma";

export async function PUT(req: Request, { params }: { params: TParams }) {
  const id_pet = parseInt(params.id);

  try {
    const body = await req.json();
    const {
      id_owner,
      id_veterinarian,
      name,
      birthday,
      sex,
      breed,
      coat_color,
      extra_data,
    } = body;

    const updatedPet = await prisma.pet.update({
      where: { id_pet },
      data: {
        id_owner,
        id_veterinarian,
        name,
        birthday: new Date(birthday),
        sex,
        breed,
        coat_color,
        extra_data,
      },
    });

    return NextResponse.json(updatedPet);
  } catch (error) {
    console.error("Error updating pet:", error);
    return NextResponse.json(
      { message: "Error al actualizar la mascota" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: TParams }) {
  const id_pet = parseInt(params.id);

  try {
    await prisma.pet.delete({
      where: { id_pet },
    });

    return NextResponse.json({ message: "Mascota eliminada exitosamente" });
  } catch (error) {
    console.error("Error deleting pet:", error);
    return NextResponse.json(
      { message: "Error al eliminar la mascota" },
      { status: 500 }
    );
  }
}

type TParams = {
  id: string;
};
