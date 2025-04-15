/* eslint-disable @typescript-eslint/no-unused-vars */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public routes that don't need authentication
const publicRoutes = [
  // API Routes
  '/api/players',
  '/api/players/', // For nested player routes
  '/api/weekly-scores',
  '/api/weekly-scores/', // For nested weekly score routes
  '/api/weekly-winnings',
  '/api/weekly-winnings/', // For nested winnings routes
  '/api/weeks',
  
  // Page Routes
  '/login',
  '/',
  '/players',
  '/weekly_score'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is public or matches a public route pattern
  const isPublicPath = publicRoutes.some(route => {
    // Exact match
    if (path === route) return true;
    
    // Handle nested API routes
    if (route.startsWith('/api/') && route.endsWith('/')) {
      const baseRoute = route.slice(0, -1); // Remove trailing slash
      return path.startsWith(baseRoute);
    }
    
    // Handle page routes with dynamic segments
    if (route === '/players' && path.startsWith('/players/')) return true;
    if (route === '/weekly_score' && path.startsWith('/weekly_score/')) return true;
    
    // Match other route starts
    return path.startsWith(route);
  });

  if (isPublicPath) {
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

// Update the matcher configuration to be more specific
export const config = {
  matcher: [
    // Protected routes
    '/admin/:path*',
    
    // API routes
    '/api/players/:path*',
    '/api/weekly-scores/:path*',
    '/api/weekly-winnings/:path*',
    '/api/weeks/:path*',
    
    // Public pages with dynamic routes
    '/players/:path*',
    '/weekly_score/:path*'
  ]
}