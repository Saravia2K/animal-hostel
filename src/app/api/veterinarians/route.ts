export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "../prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { names, last_names, clinic_name, cellphone } = body;

    const newVeterinarian = await prisma.veterinarian.create({
      data: {
        names,
        last_names,
        clinic_name,
        cellphone,
      },
    });

    return NextResponse.json(newVeterinarian, { status: 201 });
  } catch (error) {
    console.error("Error creating veterinarian:", error);
    return NextResponse.json(
      { message: "Error al crear el veterinario" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_veterinarian = searchParams.get("id_veterinarian");

  try {
    if (id_veterinarian) {
      // Obtener un veterinario específico por ID
      const veterinarian = await prisma.veterinarian.findUnique({
        where: { id_veterinarian: Number(id_veterinarian) },
      });
      if (!veterinarian) {
        return NextResponse.json(
          { message: "Veterinario no encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json(veterinarian);
    }

    // Obtener todos los veterinarios, ordenados por ID
    const veterinarians = await prisma.veterinarian.findMany({
      orderBy: {
        id_veterinarian: "asc",
      },
    });
    return NextResponse.json(veterinarians);
  } catch (error) {
    console.error("Error fetching veterinarians:", error);
    return NextResponse.json(
      { message: "Error al obtener veterinarios" },
      { status: 500 }
    );
  }
}
