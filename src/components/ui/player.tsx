import { fetchPlayers } from "@/lib/api";
import Link from "next/link";
import { GolfBallIcon, GolfFlagIcon } from "@/components/ui/BrownFamilyLogoIcon";

export default async function Player() {
  const players = await fetchPlayers();

  return (
    <div className="p-4 md:p-6">
      <main className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#EDE6D6] mb-3">Players Directory</h1>
          <div className="h-1 w-24 md:w-32 bg-[#EDE6D6] mx-auto rounded-full"></div>
          <p className="text-[#EDE6D6] mt-4 text-sm md:text-base">
            Select a player to view their detailed statistics
          </p>
        </div>
        
        {/* Players Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 ">
          {players.map((player) => (
            <Link
              key={player.player_id.toString()}
              href={`/players/${player.player_id}`}
              className="group relative bg-[#292929] hover:bg-[#305D3C]/60 border border-[#B2825E] rounded-xl overflow-hidden shadow shadow-black shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:shadow-2xl animate-fade-in"
            >
              {/* Player Card Content */}
              <div className="p-4 md:p-6 flex flex-col items-center gap-2">
                {/* Player Initial Circle with golf ball icon */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#305D3C] border-2 border-[#B2825E] flex items-center justify-center mb-3 mx-auto transitions relative">
                  <span className="text-xl md:text-2xl font-bold text-[#EDE6D6] z-10">
                    {player.player_name.charAt(0)}
                  </span>
                  <GolfBallIcon className="absolute -right-2 -bottom-2 w-6 h-6 opacity-80 group-hover:scale-110 transition-transform" />
                </div>
                {/* Player Name */}
                <div className="text-center">
                  <h2 className="text-[#EDE6D6] font-semibold text-xl md:text-2xl mb-1 underline flex items-center justify-center gap-1">
                    {player.player_name}
                    <GolfFlagIcon className="w-4 h-4 inline-block ml-1" />
                  </h2>
                  <p className="text-md md:text-xl text-[#EDE6D6]/80 ">
                    Handicap: {player.handicap}
                  </p>
                  <p className="text-md md:text-xl text-[#EDE6D6]/80">
                    Starting Average: {player.avg !== null ? player.avg : 0}
                  </p>
                  <p className="text-md md:text-xl text-[#EDE6D6]/80">
                   Weeks Played: {player.weeks_played}
                  </p>
                </div>
              </div>
              {/* Animated Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#305D3C]/30 to-[#B2825E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
