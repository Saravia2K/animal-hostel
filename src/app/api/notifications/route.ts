import { NextResponse } from "next/server";
import prisma from "../prisma";

export async function GET() {
  try {
    // Obtener todas las notificaciones, ordenadas por ID
    const notifications = await prisma.notification.findMany({
      orderBy: {
        id_notification: "asc",
      },
    });
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "Error al obtener las notificaciones" },
      { status: 500 }
    );
  }
}
