/* eslint-disable @typescript-eslint/no-unused-vars */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected routes that need authentication
const protectedRoutes = [
  '/admin',
  '/api/admin'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  if (!isProtectedRoute) {
    // For non-protected routes, just add CORS headers if it's an API route
    const response = NextResponse.next();
    
    if (path.startsWith('/api')) {
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Cache-Control', 'no-store, must-revalidate');
    }
    
    return response;
  }

  // For protected routes, check authentication
  const token = await getToken({ req: request });
  
  if (!token) {
    if (path.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Match all admin routes
    '/admin/:path*',
  ]
}