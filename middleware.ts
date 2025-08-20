export const runtime = 'edge';

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

  // Check if the request is secure (HTTPS) in production
  // and redirect to HTTPS if not
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      308
    );
  }

  const response = NextResponse.next();
  // If you want to set the real IP, you can try to get it from headers (e.g., x-forwarded-for)
  const realIp = request.headers.get('x-forwarded-for');
  if (realIp) {
    response.headers.set('x-real-ip', realIp);
  }

  // Add cache headers for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Add cache headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60')
  }

  return response;
}

// Only apply middleware to admin routes
export const config = {
  matcher: ['/admin/:path*']
}