export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "../prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id_pet, entry_date, exit_date, annotations, services } = body;

    if (!Array.isArray(services)) {
      return NextResponse.json(
        { message: "El formato de los servicios es incorrecto" },
        { status: 400 }
      );
    }

    const newEntry = await prisma.entry.create({
      data: {
        id_pet,
        entry_date,
        exit_date,
        annotations,
        services: {
          createMany: {
            data: services.map((id_service: number) => ({
              id_service,
            })),
          },
        },
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating entry with services:", error);
    return NextResponse.json(
      { message: "Error al crear la entrada y los servicios" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_entry = searchParams.get("id_entry");

  try {
    if (id_entry) {
      const entry = await prisma.entry.findUnique({
        where: { id_entry: Number(id_entry) },
        select: {
          id_entry: true,
          pet: true,
          questionnaires: {
            select: {
              id_questionnaire: true,
              question: true,
              answer: true,
            },
          },
          entry_date: true,
          exit_date: true,
          annotations: true,
        },
      });

      if (!entry) {
        return NextResponse.json(
          { message: "Entrada no encontrada" },
          { status: 404 }
        );
      }
      return NextResponse.json(entry);
    }

    const entries = await prisma.entry.findMany({
      select: {
        id_entry: true,
        pet: true,
        questionnaires: {
          select: {
            id_questionnaire: true,
            question: true,
            answer: true,
          },
        },
        entry_date: true,
        exit_date: true,
        annotations: true,
      },
      orderBy: {
        id_entry: "asc",
      },
    });
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { message: "Error al obtener las entradas" },
      { status: 500 }
    );
  }
}
