import { fetchWeeklyScores, fetchWeeklyWinnings } from "@/lib/api";
import { DataTable } from "@/components/ui/data-table";
import { scoreColumns } from "./score-columns";
import { winningsColumns } from "./winnings-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page() {
  const weekly_scores = await fetchWeeklyScores();
  const weekly_winnings = await fetchWeeklyWinnings();

  return (
    <div className="p-4 md:p-6">
      <main className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#9A9540] mb-3">
            Weekly Performance
          </h1>
          <div className="h-1 w-24 md:w-32 bg-[#9A9540] mx-auto rounded-full mb-4"></div>
          <p className="text-[#9A9540] text-sm md:text-base">
            Track scores and winnings week by week
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-[#243E2A] border border-[#9A9540] rounded-xl p-4 md:p-6">
            <h3 className="text-[#9A9540] text-sm font-medium mb-2">Total Rounds</h3>
            <p className="text-2xl md:text-3xl text-white font-bold">
              {weekly_scores.length}
            </p>
          </div>
          <div className="bg-[#243E2A] border border-[#9A9540] rounded-xl p-4 md:p-6">
            <h3 className="text-[#9A9540] text-sm font-medium mb-2">Average Score</h3>
            <p className="text-2xl md:text-3xl text-white font-bold">
              {(weekly_scores.reduce((acc, score) => acc + score.score, 0) / weekly_scores.length).toFixed(1)}
            </p>
          </div>
          <div className="bg-[#243E2A] border border-[#9A9540] rounded-xl p-4 md:p-6">
            <h3 className="text-[#9A9540] text-sm font-medium mb-2">Total Winnings</h3>
            <p className="text-2xl md:text-3xl text-white font-bold">
              ${weekly_winnings.reduce((acc, win) => acc + (win.skins + win.greens + win.partners + win.best_ball + win.low_score), 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-[#243E2A] border border-[#9A9540] rounded-xl p-4 md:p-6">
            <h3 className="text-[#9A9540] text-sm font-medium mb-2">Unique Players</h3>
            <p className="text-2xl md:text-3xl text-white font-bold">
              {new Set(weekly_scores.map(score => score.player_id)).size}
            </p>
          </div>
        </div>

        {/* Tabs for Scores and Winnings */}
        <div className="bg-[#243E2A] border border-[#9A9540] rounded-xl overflow-hidden">
          <Tabs defaultValue="scores" className="w-full">
            <div className="px-4 pt-4 md:px-6 md:pt-6">
              <TabsList className="grid w-full grid-cols-2 bg-[#1A3E2A] border border-[#9A9540] rounded-lg overflow-hidden">
                <TabsTrigger 
                  value="scores" 
                  className="py-3 text-[#9A9540] data-[state=active]:bg-[#9A9540] data-[state=active]:text-[#1A3E2A]"
                >
                  Scores
                </TabsTrigger>
                <TabsTrigger 
                  value="winnings"
                  className="py-3 text-[#9A9540] data-[state=active]:bg-[#9A9540] data-[state=active]:text-[#1A3E2A]"
                >
                  Winnings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="scores" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable 
                      columns={scoreColumns} 
                      data={weekly_scores} 
                      header="" 
                      filterItem="player_name"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="winnings" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable 
                      columns={winningsColumns} 
                      data={weekly_winnings} 
                      header="" 
                      filterItem="player_name"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Best Performances Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#243E2A] border border-[#9A9540] rounded-xl p-4 md:p-6">
            <h3 className="text-xl font-semibold text-[#9A9540] mb-4">Best Rounds</h3>
            <div className="space-y-3">
              {weekly_scores
                .sort((a, b) => a.score - b.score)
                .slice(0, 5)
                .map((score, index) => (
                  <div key={score.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[#9A9540] text-sm">{index + 1}.</span>
                      <span className="text-white">{score.player_name}</span>
                    </div>
                    <span className="text-[#9A9540] font-semibold">{score.score}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-[#243E2A] border border-[#9A9540] rounded-xl p-4 md:p-6">
            <h3 className="text-xl font-semibold text-[#9A9540] mb-4">Top Earners</h3>
            <div className="space-y-3">
              {Object.entries(
                weekly_winnings.reduce((acc, win) => {
                  const total = win.skins + win.greens + win.partners + win.best_ball + win.low_score;
                  acc[win.player_name] = (acc[win.player_name] || 0) + total;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([name, amount], index) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[#9A9540] text-sm">{index + 1}.</span>
                      <span className="text-white">{name}</span>
                    </div>
                    <span className="text-[#9A9540] font-semibold">${amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
