import { fetchPlayers } from "@/app/data/data";
import Link from "next/link";

export default async function Player() {
  const players = await fetchPlayers();
  return (
    <div className="text-[#9A9540]">
      <main className="flex flex-col gap-[32px]">
        <div className="text-xl border border-[#9A9540] p-4 rounded-xl shadow-lg shadow-black bg-[#1A3E2A] mx-auto justify-center">Players List</div>
        <div className="flex flex-row gap-[32px]">
          {players.map((player) => {
            return (
              <Link key={player.player_id} href={`/players/${player.player_id}`} className="flex-1 text-center mx-auto w-36 border border-[#9A9540] bg-[#1A3E2A] p-4 rounded-xl shadow-lg shadow-black items-center">
                <div className=" flex justify-center mx-auto">{player.player_name}</div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
