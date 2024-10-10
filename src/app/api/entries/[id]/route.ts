import { NextResponse } from "next/server";
import prisma from "../../prisma";

export async function PUT(req: Request, { params }: { params: TParams }) {
  const id_entry = parseInt(params.id);

  try {
    const body = await req.json();
    const { id_pet, entry_date, exit_date, annotations, services } = body;

    if (!Array.isArray(services)) {
      return NextResponse.json(
        { message: "El formato de los servicios es incorrecto" },
        { status: 400 }
      );
    }

    // Usamos una transacción para asegurarnos de que todo se actualice correctamente
    const updatedEntry = await prisma.$transaction(async (prisma) => {
      // Primero, actualizamos la entrada (Entry)
      const entry = await prisma.entry.update({
        where: { id_entry },
        data: {
          id_pet,
          entry_date,
          exit_date,
          annotations,
        },
      });

      // Luego, eliminamos las relaciones actuales de servicios
      await prisma.entriesServices.deleteMany({
        where: { id_entry },
      });

      // Creamos las nuevas relaciones de servicios
      await prisma.entriesServices.createMany({
        data: services.map((id_service: number) => ({
          id_entry,
          id_service,
        })),
      });

      return entry;
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("Error updating entry with services:", error);
    return NextResponse.json(
      { message: "Error al actualizar la entrada y los servicios" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: TParams }) {
  const id_entry = parseInt(params.id);

  try {
    await prisma.entry.delete({
      where: { id_entry },
    });

    return NextResponse.json({ message: "Entrada eliminada exitosamente" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return NextResponse.json(
      { message: "Error al eliminar la entrada" },
      { status: 500 }
    );
  }
}

type TParams = {
  id: string;
};
