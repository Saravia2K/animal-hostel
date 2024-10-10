export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "../prisma";

export async function GET() {
  try {
    // Obtener todos los servicios, ordenados por ID
    const services = await prisma.service.findMany({
      orderBy: {
        id_service: "asc",
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Error al obtener los servicios" },
      { status: 500 }
    );
  }
}
