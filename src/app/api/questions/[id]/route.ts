import { NextResponse } from "next/server";
import prisma from "@/app/api/prisma";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.question.delete({
      where: { id_question: id },
    });

    return NextResponse.json(
      { message: "Pregunta eliminada con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar la pregunta:", error);
    return NextResponse.json(
      { message: "Error al eliminar la pregunta" },
      { status: 500 }
    );
  }
}
