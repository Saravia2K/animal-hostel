import { NextResponse } from "next/server";
import prisma from "../../prisma";

export async function PUT(req: Request, { params }: { params: TParams }) {
  const id_owner = parseInt(params.id);

  try {
    const body = await req.json();
    const { names, last_names, home, cellphone, email, facebook, references } =
      body;

    const updatedOwner = await prisma.owner.update({
      where: { id_owner },
      data: {
        names,
        last_names,
        home,
        cellphone,
        email,
        facebook,
        references,
      },
    });

    return NextResponse.json(updatedOwner);
  } catch (error) {
    console.error("Error updating owner:", error);
    return NextResponse.json(
      { message: "Error al actualizar el propietario" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: TParams }) {
  const id_owner = parseInt(params.id);

  try {
    await prisma.owner.delete({
      where: { id_owner },
    });

    return NextResponse.json({ message: "Propietario eliminado exitosamente" });
  } catch (error) {
    console.error("Error deleting owner:", error);
    return NextResponse.json(
      { message: "Error al eliminar el propietario" },
      { status: 500 }
    );
  }
}

type TParams = {
  id: string;
};
