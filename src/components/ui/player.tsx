import { fetchPlayers } from "@/app/data/data";
import Link from "next/link";

export default async function Player() {
  const players = await fetchPlayers();
  return (
    <div className="text-[#9A9540]">
      <main className="flex flex-col gap-[32px]">
        <div className="text-xl border border-[#9A9540] p-4 rounded-xl shadow-lg shadow-black bg-[#1A3E2A]">Players List</div>
        {players.map((player) => {
          return (
            <div key={player.player_id} className="flex text-center mx-auto w-36 border border-[#9A9540] bg-[#1A3E2A] p-4 rounded-xl shadow-lg shadow-black items-center">
              <Link href={`/players/${player.player_id}`} className="flex justify-center mx-auto">
                {player.player_name}
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
}
