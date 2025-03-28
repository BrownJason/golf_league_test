import { fetchPlayers } from "@/app/data/data";
import Link from "next/link";

export default async function Player() {
  const players = await fetchPlayers();
  return (
    <div className="text-[#f9e6bf]">
      <main className="flex flex-col gap-[32px]">
        <div className="text-xl border border-[#f9e6bf] p-4 rounded-xl shadow-lg shadow-black bg-[#6c844c]">Players List</div>
        {players.map((player) => {
          console.log(player);
          return (
            <div key={player.player_id}>
              <Link href={`/players/${player.player_id}`} className="border border-[#f9e6bf] bg-[#6c844c] p-4 rounded-xl shadow-lg shadow-black w-full hover:text-black">
                {player.player_name}
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
}
