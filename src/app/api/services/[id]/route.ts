export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/app/api/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const serviceId = Number(params.id);

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { message: "ID de servicio no válido" },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id_service: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { message: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    return NextResponse.json(
      { message: "Error al obtener el servicio" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = Number(params.id);
    const { name, description } = await req.json();

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { message: "ID de servicio no válido" },
        { status: 400 }
      );
    }

    const updatedService = await prisma.service.update({
      where: { id_service: serviceId },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    return NextResponse.json(
      { message: "Error al actualizar el servicio" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = Number(params.id);

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { message: "ID de servicio no válido" },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: { id_service: serviceId },
    });

    return NextResponse.json(
      { message: "Servicio eliminado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    return NextResponse.json(
      { message: "Error al eliminar el servicio" },
      { status: 500 }
    );
  }
}
