import { fetchPlayers } from "@/lib/api";
import Link from "next/link";

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
              className="group relative bg-[#292929] hover:bg-[#305D3C]/60 border border-[#B2825E] rounded-xl overflow-hidden shadow shadow-black shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:shadow-2xl"
            >
              {/* Player Card Content */}
              <div className="p-4 md:p-6">
                {/* Player Initial Circle */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#305D3C] border-2 border-[#B2825E] flex items-center justify-center mb-3 mx-auto transitions">
                  <span className="text-xl md:text-2xl font-bold text-[#EDE6D6] ">
                    {player.player_name.charAt(0)}
                  </span>
                </div>
                
                {/* Player Name */}
                <div className="text-center">
                  <h2 className="text-[#EDE6D6] font-semibold text-sm md:text-base mb-1">
                    {player.player_name}
                  </h2>
                  <p className="text-xs md:text-sm text-[#EDE6D6]/80">
                    Handicap: {player.handicap}
                  </p>
                  <p className="text-xs md:text-sm text-[#EDE6D6]/80">
                    Starting Average: {player.avg !== null ? player.avg : 0}
                  </p>
                  <p className="text-xs md:text-sm text-[#EDE6D6]/80">
                   Weeks Played: {player.weeks_played}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 transition-all duration-300"></div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
