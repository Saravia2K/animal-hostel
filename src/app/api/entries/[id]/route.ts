import { NextRequest, NextResponse } from "next/server";
import prisma from "../../prisma";
import type { TUpdateEntryData } from "@/services/entries/updateEntry";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id_entry = parseInt(params.id, 10);

  if (isNaN(id_entry)) {
    return NextResponse.json(
      {
        message:
          "El ID de la entrada es inválido o no se proporcionó correctamente",
      },
      { status: 400 }
    );
  }

  try {
    const { services, questionnaires, ...data } =
      (await req.json()) as TUpdateEntryData;

    const [updatedEntry] = await prisma.$transaction([
      prisma.entry.update({
        where: { id_entry },
        data: {
          ...data,
          services: {
            set:
              services?.map((id_service: number) => ({
                id_service,
              })) ?? undefined,
          },
        },
      }),
      ...(questionnaires?.map((q) =>
        prisma.questionnaire.upsert({
          where: {
            id_entry_id_question: {
              id_entry,
              id_question: q.id_question,
            },
          },
          update: {
            answer: q.answer,
          },
          create: {
            id_entry,
            id_question: q.id_question,
            answer: q.answer,
          },
        })
      ) ?? []),
    ]);

    return NextResponse.json(updatedEntry, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar la entrada:", error);
    return NextResponse.json(
      { message: "Error al actualizar la entrada" },
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
