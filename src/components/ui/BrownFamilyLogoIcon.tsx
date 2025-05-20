// A compact icon version of the Brown Family Golf logo for nav/footer use
export default function BrownFamilyLogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center select-none ${className}`} aria-label="Brown Family Golf Logo Icon">
      <svg
        className="w-full h-full animate-bounce"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle cx="16" cy="16" r="14" fill="#EDE6D6" stroke="#B2825E" strokeWidth="2" />
        <circle cx="13" cy="14" r="1" fill="#B2825E" />
        <circle cx="19" cy="18" r="1" fill="#B2825E" />
        <circle cx="16" cy="20" r="1" fill="#B2825E" />
      </svg>
    </span>
  );
}

// Golf-themed SVG icons
export function GolfClubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#B2825E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20c2-2 7-7 7-7l7-7" />
      <circle cx="19" cy="5" r="2" fill="#EDE6D6" stroke="#B2825E" />
    </svg>
  );
}

export function GolfFlagIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#B2825E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21V3" />
      <path d="M6 3l10 4-10 4" fill="#EDE6D6" />
      <circle cx="6" cy="21" r="1.5" fill="#EDE6D6" />
    </svg>
  );
}

export function GolfBallIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#B2825E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" fill="#EDE6D6" />
      <circle cx="10" cy="10" r="1" fill="#B2825E" />
      <circle cx="14" cy="14" r="1" fill="#B2825E" />
    </svg>
  );
}
