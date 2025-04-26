"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="w-full bg-[#1A3E2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#9A9540] hover:text-[#9A9540]/80 transition-colors">
                Brown Family Golf
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link 
              href="/" 
              className="text-[#9A9540] hover:text-[#9A9540]/80 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9A9540] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/players" 
              className="text-[#9A9540] hover:text-[#9A9540]/80 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
            >
              <span>Players</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9A9540] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/weekly_score" 
              className="text-[#9A9540] hover:text-[#9A9540]/80 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
            >
              <span>Weekly Score</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9A9540] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/gallery" 
              className="text-[#9A9540] hover:text-[#9A9540]/80 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
            >
              <span>Gallery</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9A9540] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/pga_events" 
              className="text-[#9A9540] hover:text-[#9A9540]/80 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
            >
              <span>PGA Events</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9A9540] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#9A9540] hover:text-[#9A9540]/80 hover:bg-[#243E2A] transition-colors focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden border-t border-[#9A9540]/20`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#9A9540] hover:text-[#9A9540]/80 hover:bg-[#243E2A] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/players"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#9A9540] hover:text-[#9A9540]/80 hover:bg-[#243E2A] transition-colors"
          >
            Players
          </Link>
          <Link
            href="/weekly_score"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#9A9540] hover:text-[#9A9540]/80 hover:bg-[#243E2A] transition-colors"
          >
            Weekly Score
          </Link>
          <Link
            href="/gallery"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#9A9540] hover:text-[#9A9540]/80 hover:bg-[#243E2A] transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/pga_events"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#9A9540] hover:text-[#9A9540]/80 hover:bg-[#243E2A] transition-colors"
          >
            PGA Events
          </Link>
        </div>
      </div>
    </nav>
  );
}
