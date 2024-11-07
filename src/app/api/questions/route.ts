export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "../prisma";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const newQuestion = await prisma.question.create({
      data: { text },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error("Error al crear la pregunta:", error);
    return NextResponse.json(
      { message: "Error al crear la pregunta" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Obtener todas las preguntas, ordenadas por ID
    const questions = await prisma.question.findMany({
      orderBy: {
        id_question: "asc",
      },
    });
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { message: "Error al obtener las preguntas" },
      { status: 500 }
    );
  }
}
