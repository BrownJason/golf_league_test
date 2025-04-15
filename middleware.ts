/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Only protect admin routes
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only check auth for admin routes
  if (path.startsWith('/admin')) {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Only apply middleware to admin routes
export const config = {
  matcher: [
    '/admin/:path*'  // Only match admin routes
  ]
}