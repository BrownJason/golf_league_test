'use client';

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="bg-[#1A3E2A] border-b border-[#9A9540] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/admin" className="text-[#9A9540] hover:text-[#9A9540]/80 font-semibold">Dashboard</Link>
          <Link href="/admin/players" className="text-[#9A9540] hover:text-[#9A9540]/80">Players</Link>
          <Link href="/admin/scores" className="text-[#9A9540] hover:text-[#9A9540]/80">Scores</Link>
          <Link href="/admin/winnings" className="text-[#9A9540] hover:text-[#9A9540]/80">Winnings</Link>
          <Link href="/admin/skins" className="text-[#9A9540] hover:text-[#9A9540]/80">Skins</Link>
          <Link href="/admin/partners" className="text-[#9A9540] hover:text-[#9A9540]/80">Partners</Link>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#9A9540] focus:outline-none"
            aria-label="Open admin menu"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Logout Button (always visible) */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#9A9540] text-[#1A3E2A] rounded-md hover:bg-[#7A7530] transition-colors ml-4"
        >
          Logout
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 flex flex-col">
          <Link href="/admin" className="block text-[#9A9540] hover:text-[#9A9540]/80 font-semibold">Dashboard</Link>
          <Link href="/admin/players" className="block text-[#9A9540] hover:text-[#9A9540]/80">Players</Link>
          <Link href="/admin/scores" className="block text-[#9A9540] hover:text-[#9A9540]/80">Scores</Link>
          <Link href="/admin/winnings" className="block text-[#9A9540] hover:text-[#9A9540]/80">Winnings</Link>
          <Link href="/admin/skins" className="block text-[#9A9540] hover:text-[#9A9540]/80">Skins</Link>
          <Link href="/admin/partners" className="block text-[#9A9540] hover:text-[#9A9540]/80">Partners</Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-[#9A9540] text-[#1A3E2A] rounded-md hover:bg-[#7A7530] transition-colors mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
