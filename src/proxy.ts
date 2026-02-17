import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/"];
const authRoutes = ["/auth"];

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/chat", req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|favicon.ico|_next/static|_next/image|.*\\.png$).*)",
  ],
};
