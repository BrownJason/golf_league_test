/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Only admin routes need protection
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Add CORS headers for all API routes
  const response = NextResponse.next();
  if (path.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
  }

  // Only check auth for admin routes
  if (path.startsWith('/admin')) {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

// Only apply middleware to admin routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'  // Include API routes just for CORS headers
  ]
}