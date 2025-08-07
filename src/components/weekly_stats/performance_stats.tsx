import { WeeklyScore } from "@/app/weekly_score/score-columns";
import { WeeklyWinnings } from "@/app/weekly_score/winnings-columns";

export default function PerformanceStats({filteredScores, filteredWinnings}: {
    filteredScores: WeeklyScore[], filteredWinnings: WeeklyWinnings[]
}) {
    return (
        <>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
            <h3 className="text-xl font-semibold text-[#EDE6D6] mb-4">Best Rounds</h3>
            <div className="space-y-3">
              {filteredScores
                .sort((a, b) => a.adjusted_score - b.adjusted_score)
                .slice(0, 5)
                .map((score, index) => (
                  <div key={score.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[#EDE6D6] text-sm">{index + 1}.</span>
                      <span className="text-white">{score.player_name}</span>
                    </div>
                    <span className="text-[#EDE6D6] font-semibold">{score.adjusted_score}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
            <h3 className="text-xl font-semibold text-[#EDE6D6] mb-4">Top Earners</h3>
            <div className="space-y-3">
              {Object.entries(
                filteredWinnings.reduce((acc, win) => {
                  const total = parseFloat(win.skins) + parseFloat(win.greens) + parseFloat(win.partners) + parseFloat(win.best_ball) + parseFloat(win.low_score);
                  acc[win.player_name] = (acc[win.player_name] || 0) + total;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([name, amount], index) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[#EDE6D6] text-sm">{index + 1}.</span>
                      <span className="text-white">{name}</span>
                    </div>
                    <span className="text-[#EDE6D6] font-semibold">{amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2
                      })}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        </>
    )
}