import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const dbUser = "tu_usuario"; // Cambia a tu usuario de la base de datos
  const dbName = "nombre_de_tu_base_de_datos"; // Cambia al nombre de tu base de datos
  const dbHost = "localhost"; // Cambia al host de tu base de datos
  const dumpFilePath = path.join(process.cwd(), "dump.sql"); // Ruta temporal para el archivo

  const dumpCommand = `pg_dump -U ${dbUser} -h ${dbHost} -d ${dbName} -f ${dumpFilePath}`;

  return new Promise((resolve) => {
    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al generar el volcado: ${stderr}`);
        return resolve(
          new NextResponse("Error al generar el volcado", { status: 500 })
        );
      }

      // Lee el archivo como un buffer y configúralo en la respuesta
      fs.readFile(dumpFilePath, (readError, data) => {
        if (readError) {
          console.error(`Error al leer el archivo de volcado: ${readError}`);
          return resolve(
            new NextResponse("Error al leer el archivo de volcado", {
              status: 500,
            })
          );
        }

        const response = new NextResponse(data, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": 'attachment; filename="dump.sql"',
          },
        });

        // Elimina el archivo después de la lectura
        fs.unlinkSync(dumpFilePath);

        resolve(response);
      });
    });
  });
}
