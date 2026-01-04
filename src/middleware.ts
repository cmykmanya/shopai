import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
const adminRoutes = [
  "/admin",
  "/admin/products",
  "/admin/orders",
  "/admin/users",
  "/admin/settings",
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = adminRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isAdmin = req.auth?.user?.role === "ADMIN";

  if (isAdminRoute && (!isLoggedIn || !isAdmin)) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};