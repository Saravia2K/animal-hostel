export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/app/api/prisma";

export async function GET(
  _: Request,
  { params }: { params: { timestamp: string } }
) {
  try {
    const targetDate = dayjs(Number(params.timestamp));
    if (!targetDate.isValid()) {
      return NextResponse.json(
        { message: "El timestamp proporcionado no es válido" },
        { status: 400 }
      );
    }

    const dayStart = targetDate.startOf("day").toDate();
    const dayEnd = targetDate.endOf("day").toDate();

    const entries = await prisma.entry.findMany({
      where: {
        entry_date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      select: {
        id_entry: true,
        pet: {
          include: {
            owner: true,
          },
        },
        entry_date: true,
        services: true,
        notification_seen: true,
      },
      orderBy: [{ notification_seen: "asc" }, { entry_date: "asc" }],
    });

    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las entradas:", error);
    return NextResponse.json(
      { message: "Error al obtener las entradas" },
      { status: 500 }
    );
  }
}
