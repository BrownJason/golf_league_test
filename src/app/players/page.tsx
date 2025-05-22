import { fetchPlayers } from "@/lib/api";
import Player from "@/components/ui/player";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Animated golf-themed SVG background for players page
const GolfBackground = () => (
  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none animate-fade-in" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.10}}>
    <defs>
      <linearGradient id="golfGradientPlayers" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#305D3C"/>
        <stop offset="100%" stopColor="#B2825E"/>
      </linearGradient>
    </defs>
    <ellipse cx="720" cy="320" rx="900" ry="120" fill="url(#golfGradientPlayers)" />
    <circle cx="1240" cy="180" r="30" fill="#EDE6D6" stroke="#B2825E" strokeWidth="4"/>
    <rect x="100" y="200" width="12" height="60" rx="4" fill="#B2825E"/>
    <polygon points="150,210 110,200 110,220" fill="#EDE6D6"/>
  </svg>
);

export default async function Page() {
  try {
    const players = await fetchPlayers();

    if (!players || players.length === 0) {
      return (
        <div className="p-4 md:p-6 relative overflow-hidden">
          <GolfBackground />
          <main className="max-w-7xl mx-auto p-4 md:p-6 animate-fade-in relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#EDE6D6] mb-3">
                No Players Available
              </h1>
              <p className="text-[#EDE6D6]/80">
                There are currently no players in the system.
              </p>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="p-4 md:p-6 relative overflow-hidden">
        <GolfBackground />
        <main className="max-w-full mx-auto p-4 md:p-6 animate-fade-in relative z-10">
          <Player />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading players:', error);
    throw error; // This will trigger the error boundary
  }
}
