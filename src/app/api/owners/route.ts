export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "../prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { names, last_names, home, cellphone, email, facebook, references } =
      body;

    const newOwner = await prisma.owner.create({
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

    return NextResponse.json(newOwner, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    return NextResponse.json(
      { message: "Error al crear el propietario" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_owner = searchParams.get("id_owner");

  try {
    if (id_owner) {
      // Obtener un propietario específico por ID
      const owner = await prisma.owner.findUnique({
        where: { id_owner: Number(id_owner) },
      });
      if (!owner) {
        return NextResponse.json(
          { message: "Propietario no encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json(owner);
    }

    // Obtener todos los propietarios
    const owners = await prisma.owner.findMany();
    return NextResponse.json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    return NextResponse.json(
      { message: "Error al obtener propietarios" },
      { status: 500 }
    );
  }
}
