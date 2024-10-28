export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "../prisma";

export async function POST(req: Request) {
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

    const newPet = await prisma.pet.create({
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

    return NextResponse.json(newPet, { status: 201 });
  } catch (error) {
    console.error("Error creating pet:", error);
    return NextResponse.json(
      { message: "Error al crear la mascota" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_pet = searchParams.get("id_pet");

  try {
    if (id_pet) {
      const pet = await prisma.pet.findUnique({
        where: { id_pet: Number(id_pet) },
        select: {
          id_pet: true,
          name: true,
          sex: true,
          breed: true,
          coat_color: true,
          birthday: true,
          extra_data: true,
          owner: true,
          veterinarian: true,
          entries: true,
        },
      });
      if (!pet) {
        return NextResponse.json(
          { message: "Mascota no encontrada" },
          { status: 404 }
        );
      }
      return NextResponse.json(pet);
    }

    // Obtener todos los pets, ordenados por ID
    const pets = await prisma.pet.findMany({
      include: {
        owner: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json(
      { message: "Error al obtener las mascotas" },
      { status: 500 }
    );
  }
}
