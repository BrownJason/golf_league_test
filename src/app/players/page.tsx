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
      <div className="p-4 md:p-6">
        <main className="max-w-full mx-auto">
          <Player />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading players:', error);
    throw error; // This will trigger the error boundary
  }
}
