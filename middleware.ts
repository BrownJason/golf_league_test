/* eslint-disable @typescript-eslint/no-unused-vars */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public routes that don't need authentication
const publicRoutes = [
  '/api/players',
  '/api/weekly-scores',
  '/api/weekly-winnings',
  '/api/weeks',
  '/login',
  '/'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is public
  if (publicRoutes.some(route => path.startsWith(route))) {
    const response = NextResponse.next();
    
    // Add CORS headers for API routes
    if (path.startsWith('/api')) {
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Cache-Control', 'no-store, must-revalidate');
    }
    
    return response;
  }

  // For protected routes (like /admin)
  const token = await getToken({ req: request });
  
  // If no token and trying to access protected route
  if (!token) {
    if (path.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ]
}