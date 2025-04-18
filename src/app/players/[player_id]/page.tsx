import { columns } from "./columns";
import WeekFilter from "./handlefilter";
import PieChart from "./winning-chart";
import { DataTable } from "@/components/ui/data-table";
import { fetchPlayer, fetchPlayerScores, fetchPlayerScoresByWeek, fetchPlayerWinnings, fetchWeeksByPlayer } from "@/lib/api";
import { WeeklyScore } from "@/app/weekly_score/score-columns";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({
  params,
  searchParams
}: { 
  params: Promise<{ player_id: string }>;
  searchParams: Promise<{ week?: string }>;
}) {
  // Await both params and searchParams
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams
  ]);

  const selectedWeek = resolvedSearchParams?.week || null;
  const player_id = resolvedParams.player_id;

  try {
    // Fetch all data in parallel
    const [player, playerScores, playerWinnings, distinctWeeks] = await Promise.all([
      fetchPlayer(parseInt(player_id)),
      selectedWeek ? fetchPlayerScoresByWeek(parseInt(player_id), selectedWeek.replaceAll('/','')) : fetchPlayerScores(parseInt(player_id)),
      fetchPlayerWinnings(parseInt(player_id)),
      fetchWeeksByPlayer(parseInt(player_id))
    ]);

    let playerScoresByWeek = playerScores;
    if (selectedWeek) {
      playerScoresByWeek = playerScores;
    }

    const formattedWinnings = playerWinnings.map((res: { total: string }) => res.total);
    const avgScore = playerScores.length === 0 
      ? 0 
      : playerScores.reduce((acc: number, val: WeeklyScore) => acc + val.score, 0) / playerScores.length;

    const weeksPlayed = playerScores.reduce((acc: number, val: WeeklyScore) => 
      val.week_date ? acc + 1 : acc, 0);

    return (
      <div className="p-4 md:p-6">
        {/* Player Header Section - Made more compact on mobile */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#9A9540] text-center mb-2 px-2">
            {player.player_name}
          </h1>
          <div className="h-1 w-24 md:w-32 bg-[#9A9540] mx-auto rounded-full"></div>
        </div>

        {/* Stats Grid - Single column on mobile, three columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Handicap Card */}
          <div className="bg-[#243E2A] p-4 md:p-6 rounded-xl border border-[#9A9540] shadow-lg">
            <h3 className="text-[#9A9540] text-base md:text-lg font-semibold mb-1 md:mb-2">Current Handicap</h3>
            <p className="text-2xl md:text-3xl text-white">{player.handicap}</p>
          </div>

          {/* Average Score Card */}
          <div className="bg-[#243E2A] p-4 md:p-6 rounded-xl border border-[#9A9540] shadow-lg">
            <h3 className="text-[#9A9540] text-base md:text-lg font-semibold mb-1 md:mb-2">Average Score</h3>
            <p className="text-2xl md:text-3xl text-white">{avgScore.toFixed(1)}</p>
          </div>

          {/* Weeks Played Card */}
          <div className="bg-[#243E2A] p-4 md:p-6 rounded-xl border border-[#9A9540] shadow-lg">
            <h3 className="text-[#9A9540] text-base md:text-lg font-semibold mb-1 md:mb-2">Weeks Played</h3>
            <p className="text-2xl md:text-3xl text-white">{weeksPlayed}</p>
          </div>
        </div>

        {/* Winnings Section */}
        {formattedWinnings.length > 0 && formattedWinnings[0] !== "$.00" ? (
          <div className="mb-6 md:mb-8">
            <div className="bg-[#243E2A] p-4 md:p-6 rounded-xl border border-[#9A9540] shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold text-[#9A9540] mb-4 md:mb-6">Season Winnings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Pie Chart - Full width on mobile */}
                <div className="p-3 md:p-4 rounded-lg order-2 md:order-1">
                  <PieChart 
                    values={playerWinnings} 
                    avg_score={avgScore} 
                    player={player} 
                    weeks_played={weeksPlayed} 
                    formattedWinnings={formattedWinnings} 
                  />
                </div>
                {/* Winnings Breakdown - Above chart on mobile */}
                <div className="space-y-3 order-1 md:order-2">
                  {Object.entries(playerWinnings[0]).map(([category, amount]) => {
                    if (category !== 'player_id' && category !== 'total') {
                      return (
                        <div key={category} className="flex justify-between items-center border-b border-[#9A9540] pb-2">
                          <span className="text-[#9A9540] capitalize text-sm md:text-base">
                            {category.replace('_', ' ')}
                          </span>
                          <span className="text-white text-sm md:text-base">
                            ${Number(amount).toFixed(2)}
                          </span>
                        </div>
                      );
                    }
                  })}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[#9A9540] font-bold text-sm md:text-base">Total</span>
                    <span className="text-white font-bold text-sm md:text-base">{formattedWinnings[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#243E2A] p-4 md:p-6 rounded-xl border border-[#9A9540] shadow-lg mb-6 md:mb-8 text-center">
            <p className="text-[#9A9540]">No winnings recorded yet</p>
          </div>
        )}

        {/* Scores Section */}
        {weeksPlayed > 0 && (
          <div className="bg-[#243E2A] rounded-xl border border-[#9A9540] shadow-lg overflow-hidden">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#9A9540] mb-4">Score History</h2>
              <div className="mb-4">
                <WeekFilter weeks={distinctWeeks} selectedWeek={selectedWeek} />
              </div>
            </div>
            {/* Table with horizontal scroll on mobile */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#9A9540] scrollbar-track-[#1A3E2A] m-4">
              <div className="min-w-[640px]"> {/* Minimum width to prevent squishing */}
                <DataTable 
                  columns={columns} 
                  data={selectedWeek ? playerScoresByWeek : playerScores} 
                  header="" 
                  filterItem="week_date" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Performance Trends Section */}
        {weeksPlayed > 0 && (
          <div className="mt-6 md:mt-8 bg-[#243E2A] p-4 md:p-6 rounded-xl border border-[#9A9540] shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-[#9A9540] mb-4 md:mb-6">Performance Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center bg-[#1A3E2A] p-3 rounded-lg">
                <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Best Score</h3>
                <p className="text-xl md:text-2xl text-white">
                  {Math.min(...playerScores.map(score => score.score))}
                </p>
              </div>
              <div className="text-center bg-[#1A3E2A] p-3 rounded-lg">
                <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Recent Trend</h3>
                <p className="text-xl md:text-2xl text-white">
                  {calculateTrend(playerScores)}
                </p>
              </div>
              {/* <div className="text-center bg-[#1A3E2A] p-3 rounded-lg">
                <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Consistency</h3>
                <p className="text-xl md:text-2xl text-white">
                  {calculateConsistency(playerScores)}%
                </p>
              </div> */}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A3E2A]">
        <div className="text-[#9A9540]">Error loading player data</div>
      </div>
    );
  }
}

// Helper functions for performance calculations
function calculateTrend(scores: { score: number }[]) {
  if (scores.length < 2) return 'N/A';
  const recent = scores.slice(0, 3).map(s => s.score);
  const avg = recent.reduce((a: number, b: number) => a + b, 0) / recent.length;
  const overall = scores.map(s => s.score).reduce((a: number, b: number) => a + b, 0) / scores.length;
  return avg < overall ? '↑ Improving' : avg > overall ? '↓ Declining' : '→ Steady';
}

// function calculateConsistency(scores: { score: number }[]) {
//   if (scores.length < 2) return 'N/A';
//   const scoreValues = scores.map(s => s.score);
//   const mean = scoreValues.reduce((a: number, b: number ) => a + b, 0) / scoreValues.length;
//   const variance = scoreValues.reduce((a: number, b: number ) => a + Math.pow(b - mean, 2), 0) / scoreValues.length;
//   const stdDev = Math.sqrt(variance);
//   // Convert to a percentage where lower variation = higher consistency
//   const consistency = Math.max(0, 100 - (stdDev * 10));
//   return Math.round(consistency);
// } 