import { Metadata } from 'next';
import { fetchWeeklyScores, fetchWeeklySkins, fetchWeeklyWinnings } from "@/lib/api";
import { DataTable } from "@/components/ui/data-table";
import { scoreColumns } from "./score-columns";
import { winningsColumns } from "./winnings-columns";
import { skinsColumns } from "./skins-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This is fine for server components
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'Weekly Performance | Brown Family Golf',
  description: 'Track scores and winnings week by week',
};

export default async function Page() {
  try {
    const [weekly_scores, weekly_skins, weekly_winnings] = await Promise.all([
      fetchWeeklyScores(),
      fetchWeeklySkins(),
      fetchWeeklyWinnings().catch(error => {
        console.error('Error fetching winnings:', error);
        return [];
      })
    ]);

    // Handle empty states
    if (!weekly_scores || weekly_scores.length === 0) {
      return (
        <div className="p-4 md:p-6">
          <main className="max-w-full mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-[#EDE6D6] mb-3">
                No Scores Available
              </h1>
              <p className="text-[#EDE6D6] text-sm md:text-base">
                There are currently no weekly scores recorded.
              </p>
            </div>
          </main>
        </div>
      );
    }

    // Calculate stats safely
    const totalRounds = weekly_scores.length;
    const averageScore = totalRounds > 0 
      ? (weekly_scores.reduce((acc, score) => acc + score.score, 0) / totalRounds).toFixed(1)
      : 0.0;
    const totalWinnings = (weekly_winnings || []).reduce((acc, win) => 
      acc + (parseFloat(win.skins) + parseFloat(win.greens) + parseFloat(win.partners) + parseFloat(win.best_ball) + parseFloat(win.low_score)), 0
    ).toLocaleString("en-US", { style: "currency", currency: "USD" });
    const uniquePlayers = new Set(weekly_scores.map(score => score.player_id)).size;

    return (
      <div className="p-4 md:p-6">
        <main className="max-w mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-[#EDE6D6] mb-3">
              Weekly Performance
            </h1>
            <div className="h-1 w-24 md:w-32 bg-text mx-auto rounded-full mb-4"></div>
            <p className="text-[#EDE6D6] text-sm md:text-base">
              Track scores and winnings week by week
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
              <h3 className="text-[#EDE6D6] text-sm font-medium mb-2">Total Rounds</h3>
              <p className="text-2xl md:text-3xl text-white font-bold">
                {totalRounds}
              </p>
            </div>
            <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
              <h3 className="text-[#EDE6D6] text-sm font-medium mb-2">Average Score</h3>
              <p className="text-2xl md:text-3xl text-white font-bold">
                {averageScore}
              </p>
            </div>
            <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
              <h3 className="text-[#EDE6D6] text-sm font-medium mb-2">Total Winnings</h3>
              <p className="text-2xl md:text-3xl text-white font-bold">
                {totalWinnings}
              </p>
            </div>
            <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
              <h3 className="text-[#EDE6D6] text-sm font-medium mb-2">Unique Players</h3>
              <p className="text-2xl md:text-3xl text-white font-bold">
                {uniquePlayers}
              </p>
            </div>
          </div>

          {/* Tabs for Scores and Winnings */}
          <div className="bg-[#292929] border border-[#B2825E] rounded-xl overflow-hidden shadow shadow-black shadow-lg">
            <Tabs defaultValue="scores" className="w-full">
              <div className="px-4 pt-4 md:px-6 md:pt-6">
                <TabsList className="grid w-full grid-cols-3 bg-[#292929] border border-[#B2825E] rounded-lg overflow-hidden">
                  <TabsTrigger 
                    value="scores" 
                    className="py-3 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                  >
                    Scores
                  </TabsTrigger>
                  <TabsTrigger 
                    value="winnings"
                    className="py-3 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                  >
                    Winnings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="skins"
                    className="py-3 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                  >
                    Skins
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
              
              <TabsContent value="skins" className="mt-4">
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px] p-4 md:p-6">
                      <DataTable 
                        columns={skinsColumns} 
                        data={weekly_skins} 
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
            <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
              <h3 className="text-xl font-semibold text-[#EDE6D6] mb-4">Best Rounds</h3>
              <div className="space-y-3">
                {weekly_scores
                  .sort((a, b) => a.score - b.score)
                  .slice(0, 5)
                  .map((score, index) => (
                    <div key={score.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[#EDE6D6] text-sm">{index + 1}.</span>
                        <span className="text-white">{score.player_name}</span>
                      </div>
                      <span className="text-[#EDE6D6] font-semibold">{score.score}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
              <h3 className="text-xl font-semibold text-[#EDE6D6] mb-4">Top Earners</h3>
              <div className="space-y-3">
                {Object.entries(
                  weekly_winnings.reduce((acc, win) => {
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
                      <span className="text-[#EDE6D6] font-semibold">${amount}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error in weekly scores page:', error);
    throw error; // This will trigger the error boundary
  }
}
