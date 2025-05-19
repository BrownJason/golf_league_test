'use client';

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="bg-[#1A3E2A] border-b border-[#9A9540] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link 
            href="/admin" 
            className="text-[#9A9540] hover:text-[#9A9540]/80 font-semibold"
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/players" 
            className="text-[#9A9540] hover:text-[#9A9540]/80"
          >
            Players
          </Link>
          <Link 
            href="/admin/scores" 
            className="text-[#9A9540] hover:text-[#9A9540]/80"
          >
            Scores
          </Link>
          <Link 
            href="/admin/winnings" 
            className="text-[#9A9540] hover:text-[#9A9540]/80"
          >
            Winnings
          </Link>
          <Link 
            href="/admin/skins" 
            className="text-[#9A9540] hover:text-[#9A9540]/80"
          >
            Skins
          </Link>
          <Link 
            href="/admin/partners" 
            className="text-[#9A9540] hover:text-[#9A9540]/80"
          >
            Partners
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#9A9540] text-[#1A3E2A] rounded-md hover:bg-[#7A7530] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
