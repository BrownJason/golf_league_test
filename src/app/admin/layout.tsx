'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
    
    if (status === 'unauthenticated') {
      console.log('No session found, redirecting to login...');
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#9A9540]">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <nav className="bg-[#1A3E2A] border-b border-[#9A9540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-[#9A9540] font-bold"><Link href="/admin">Admin Dashboard</Link></span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-[#9A9540]">
                Welcome, {session.user?.username}
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}