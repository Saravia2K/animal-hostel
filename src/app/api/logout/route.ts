import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout exitoso" },
    { status: 200 }
  );

  // Borrar la cookie al hacer logout
  response.cookies.set("isLoggedIn", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Expira inmediatamente
  });

  return response;
}
