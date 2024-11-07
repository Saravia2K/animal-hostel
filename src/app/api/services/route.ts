export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/app/api/prisma";

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { message: "El nombre y la descripción son requeridos" },
        { status: 400 }
      );
    }

    const newService = await prisma.service.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return NextResponse.json(
      { message: "Error al crear el servicio" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        id_service: "asc",
      },
    });

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return NextResponse.json(
      { message: "Error al obtener los servicios" },
      { status: 500 }
    );
  }
}
