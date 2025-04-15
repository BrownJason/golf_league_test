/* eslint-disable @typescript-eslint/no-unused-vars */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      }
    },
  }
);

export async function middleware(request: NextRequest) {
  // Get the pathname from the request
  const path = request.nextUrl.pathname;

  // Add CORS headers for API routes
  if (path.startsWith('/api')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    
    // Handle public API routes that don't need authentication
    if (path.startsWith('/api/players') || 
        path.startsWith('/api/weekly-scores') || 
        path.startsWith('/api/weekly-winnings')) {
      return response;
    }

    // Protected API routes
    const token = await getToken({ req: request });
    if (!token && !path.startsWith('/api/auth')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return response;
  }

  // Handle admin routes
  if (path.startsWith('/admin')) {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ]
};