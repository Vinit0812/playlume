import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Skip login page auth check but always enforce noindex header
    if (pathname === "/admin/login") {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }

    // Check for admin session token (NextAuth session cookie)
    const sessionToken =
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    if (!sessionToken) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }

    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
