import { NextResponse } from "next/server";
import { verifyJwtToken } from "./app/lib/auth";

// Define paths that require authentication
const protectedPaths = ["/cms"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if the current path is a protected path
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = req.cookies.get("session");

    // Redirect to login if no token is found
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Attempt to verify the JWT token
    const hasVerifiedToken = await verifyJwtToken(token);

    if (hasVerifiedToken) {
      // If authenticated, pass session information as a request header
      const response = NextResponse.next();
      response.headers.set("x-session-valid", "true"); // Custom header
      return response;
      //return NextResponse.next(); // Token is valid, continue
    }

    // If verification fails, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue for non-protected paths
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/cms/:path*"],
};
