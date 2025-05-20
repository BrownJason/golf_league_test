import React from "react";

export default function BrownFamilyLogo() {
  return (
    <div className="flex items-center justify-center gap-2 select-none">
      {/* Animated golf ball */}
      <svg
        className="w-8 h-8 animate-bounce"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle cx="16" cy="16" r="14" fill="#EDE6D6" stroke="#B2825E" strokeWidth="2" />
        <circle cx="13" cy="14" r="1" fill="#B2825E" />
        <circle cx="19" cy="18" r="1" fill="#B2825E" />
        <circle cx="16" cy="20" r="1" fill="#B2825E" />
      </svg>
      {/* Animated text */}
      <span className="font-extrabold text-3xl md:text-5xl text-[#EDE6D6] tracking-tight animate-logo-fade">
        Brown Family <span className="text-[#B2825E] font-outline-1">Golf</span>
      </span>
    </div>
  );
}
