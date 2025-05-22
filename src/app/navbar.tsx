"use client";
import BrownFamilyLogoIcon from "@/components/ui/BrownFamilyLogoIcon";
import Link from "next/link";
import { useState } from "react";
import { GolfClubIcon, GolfFlagIcon, GolfBallIcon } from "@/components/ui/BrownFamilyLogoIcon";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-[#0F3826]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-[#EDE6D6] hover:text-[#EDE6D6]/80 px-3 py-2 rounded-md text-sm font-medium transitions relative group">
              <BrownFamilyLogoIcon />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link 
              href="/" 
              className="text-[#EDE6D6] hover:text-[#EDE6D6]/80 px-3 py-2 rounded-md text-sm font-medium transitions relative group flex items-center gap-1"
            >
              <GolfFlagIcon className="w-5 h-5" />
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EDE6D6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/players" 
              className="text-[#EDE6D6] hover:text-[#EDE6D6]/80 px-3 py-2 rounded-md text-sm font-medium transitions relative group flex items-center gap-1"
            >
              <GolfClubIcon className="w-5 h-5" />
              <span>Players</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EDE6D6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/weekly_score" 
              className="text-[#EDE6D6] hover:text-[#EDE6D6]/80 px-3 py-2 rounded-md text-sm font-medium transitions relative group flex items-center gap-1"
            >
              <GolfBallIcon className="w-5 h-5" />
              <span>Weekly Scores</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EDE6D6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/gallery" 
              className="text-[#EDE6D6] hover:text-[#EDE6D6]/80 px-3 py-2 rounded-md text-sm font-medium transitions relative group"
            >
              <span>Gallery</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EDE6D6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              href="/pga_events" 
              className="text-[#EDE6D6] hover:text-[#EDE6D6]/80 px-3 py-2 rounded-md text-sm font-medium transitions relative group"
            >
              <span>PGA Events</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#EDE6D6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </div>


          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#EDE6D6] hover:text-[#EDE6D6]/80 hover:bg-[#243E2A] transitions focus:outline-none"
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
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden border-t border-[#EDE6D6]/20`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#EDE6D6] hover:text-[#EDE6D6]/80 hover:bg-[#243E2A] transitions flex flex-row "
          >
            <GolfFlagIcon className="w-5 h-5" />
            Home
          </Link>
          <Link
            href="/players"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#EDE6D6] hover:text-[#EDE6D6]/80 hover:bg-[#243E2A] transitions flex flex-row "
          >
            <GolfClubIcon className="w-5 h-5" />
            Players
          </Link>
          <Link
            href="/weekly_score"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#EDE6D6] hover:text-[#EDE6D6]/80 hover:bg-[#243E2A] transitions flex flex-row "
          >
            <GolfBallIcon className="w-5 h-5" />
            Weekly Score
          </Link>
          <Link
            href="/gallery"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#EDE6D6] hover:text-[#EDE6D6]/80 hover:bg-[#243E2A] transitions flex flex-row "
          >
            Gallery
          </Link>
          <Link
            href="/pga_events"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#EDE6D6] hover:text-[#EDE6D6]/80 hover:bg-[#243E2A] transitions"
          >
            PGA Events
          </Link>
        </div>
      </div>
    </nav>
  );
}
