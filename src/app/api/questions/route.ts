export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "../prisma";

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
