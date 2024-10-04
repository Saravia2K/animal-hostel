import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const validEmail = process.env.ADMIN_EMAIL as string;
    const validPasswordHash = process.env.ADMIN_PASSWORD_HASH as string;

    // Comparar el email
    if (email !== validEmail) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    // Comparar la contraseña hasheada
    const passwordMatch = await bcrypt.compare(password, validPasswordHash);

    if (passwordMatch) {
      const response = NextResponse.json(
        { message: "Login exitoso" },
        { status: 200 }
      );

      // Establecer una cookie segura (usamos HttpOnly para que no sea accesible desde JS)
      response.cookies.set("isLoggedIn", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Asegurarse de que la cookie sea segura en producción
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // La cookie expirará en 1 día
      });

      return response;
    } else {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(`Error login: ${error}`);
    return NextResponse.json(
      { message: "Server error", date: new Date() },
      { status: 500 }
    );
  }
}
