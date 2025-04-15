/* eslint-disable @typescript-eslint/no-unused-vars */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { headers } from 'next/headers'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser should use relative path
    return '';
  }

  // Server should use the host header or environment variables
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    
    if (host) {
      return `${protocol}://${host}`;
    }

    // Fallback to environment variables
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  } catch (e) {
    // Fallback if headers() fails
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }
}
