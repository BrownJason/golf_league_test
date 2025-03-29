"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);

  return (
    <div>
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="focus:outline-none w-full">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className={`w-full lg:flex lg:flex-row lg:items-center lg:w-auto lg:gap-6 ${isOpen ? "block" : "hidden"}`}>
        <Link href="/" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          Home
        </Link>
        <Link href="/players" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          Players
        </Link>
        <Link href="/weekly_score" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          Weekly Score
        </Link>
      </div>
    </div>
  );
}
