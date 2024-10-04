import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const {
    cookies,
    nextUrl: { pathname },
  } = req;

  const isLoggedIn = cookies.get("isLoggedIn")?.value;

  // Si el usuario está en /login pero ya tiene la cookie, redirige a /dashboard
  if (pathname === "/login" && isLoggedIn === "true") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Proteger las rutas que inicien con /dashboard si no existe la cookie
  if (pathname.startsWith("/dashboard") && isLoggedIn !== "true") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continuar con la solicitud si todo está bien
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
