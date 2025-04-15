import { fetchPlayers } from "@/lib/api";
import Player from "@/components/ui/player";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Page() {
  try {
    const players = await fetchPlayers();

    if (!players || players.length === 0) {
      return (
        <div className="p-4 md:p-6">
          <main className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#9A9540] mb-3">
                No Players Available
              </h1>
              <p className="text-[#9A9540]/80">
                There are currently no players in the system.
              </p>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="grid grid-rows-[5%_1fr_5%] items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
          <Player />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading players:', error);
    throw error; // This will trigger the error boundary
  }
}
