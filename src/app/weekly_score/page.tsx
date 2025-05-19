"use client";

import { fetchWeeklyScores, fetchWeeklySkins, fetchWeeklyWinnings, fetchWeeklyPartners } from "@/lib/api";
import { DataTable } from "@/components/ui/data-table";
import { scoreColumns } from "./score-columns";
import { winningsColumns } from "./winnings-columns";
import { skinsColumns, WeeklySkins as SkinsTableRow } from "./skins-columns";
import { partnerColumns } from "./partner-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeekFilter from './week-filter';
import { useEffect, useState } from 'react';
import { WeeklyScore } from "./score-columns";
import { WeeklyWinnings } from "./winnings-columns";
import { WeeklySkins } from "./skins-columns";
import { PartnerScore } from "./partner-columns";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// export const metadata: Metadata = {
//   title: 'Weekly Performance | Brown Family Golf',
//   description: 'Track scores and winnings week by week',
// };

export default function Page() {
  const [weeklyScores, setWeeklyScores] = useState<WeeklyScore[]>([]);
  const [weeklyWinnings, setWeeklyWinnings] = useState<WeeklyWinnings[]>([]);
  const [weeklySkins, setWeeklySkins] = useState<WeeklySkins[]>([]);
  const [weeklyPartners, setWeeklyPartners] = useState<PartnerScore[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [allWeeks, setAllWeeks] = useState<{ week_date: string; formatted_date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to normalize week_date to string
  function getWeekDateString(week_date: string | Date): string {
    if (typeof week_date === 'string') return week_date;
    if (week_date && typeof week_date === 'object' && 'toISOString' in week_date && typeof week_date.toISOString === 'function') {
      console.log('week_date:', week_date);
      
      return week_date.toISOString().slice(0, 10);
    }
    return '';
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [scores, skins, winnings, partners] = await Promise.all([
        fetchWeeklyScores(),
        fetchWeeklySkins(),
        fetchWeeklyWinnings(),
        fetchWeeklyPartners(),
      ]);
      setWeeklyScores(scores);
      setWeeklySkins(skins);
      setWeeklyWinnings(winnings);
      setWeeklyPartners(partners);
      const weeks = Array.from(new Set(scores.map((s: WeeklyScore) => getWeekDateString(s.week_date))))
        .filter(Boolean)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((week_date) => ({
          week_date,
          // Format as MM/DD/YYYY using string split, not Date object
          formatted_date: (() => {
            const [year, month, day] = week_date.split("-");
            return `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
          })(),
        }));
      setAllWeeks(weeks);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-[#9A9540]">Loading...</div>;
  }

  if (!weeklyScores || weeklyScores.length === 0) {
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

  const filteredScores = selectedWeek ? weeklyScores.filter(s => getWeekDateString(s.week_date) === selectedWeek) : weeklyScores;
  const filteredWinnings = selectedWeek ? weeklyWinnings.filter(w => getWeekDateString(w.week_date) === selectedWeek) : weeklyWinnings;
  const filteredSkins = selectedWeek ? weeklySkins.filter(s => getWeekDateString(s.week_date) === selectedWeek) : weeklySkins;
  const filteredPartners = selectedWeek ? weeklyPartners.filter(p => getWeekDateString(p.week_date) === selectedWeek) : weeklyPartners;

  // Calculate stats safely
  const totalRounds = filteredScores.length;
  const averageScore = totalRounds > 0 
    ? (filteredScores.reduce((acc, score) => acc + score.score, 0) / totalRounds).toFixed(1)
    : 0.0;
  const totalWinnings = (filteredWinnings || []).reduce((acc, win) => 
    acc + (parseFloat(win.skins) + parseFloat(win.greens) + parseFloat(win.partners) + parseFloat(win.best_ball) + parseFloat(win.low_score)), 0
  ).toLocaleString("en-US", { style: "currency", currency: "USD" });
  const uniquePlayers = new Set(filteredScores.map(score => score.player_id)).size;

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
          
          {/* Week Filter UI */}
          <div className="mb-6 flex justify-start items-center gap-4 px-4 pt-4 md:px-6 md:pt-6">
            <h2 className="text-[#EDE6D6] text-sm font-medium">Select Week:</h2>
            {/* WeekFilter will be hydrated client-side for filtering */}
            <WeekFilter weeks={allWeeks} selectedWeek={selectedWeek} onChange={setSelectedWeek} />
          </div>
          
          <Tabs defaultValue="scores" className="w-full">
            <div className="px-4 pt-4 md:px-6 md:pt-6">
              <TabsList className="grid w-full grid-cols-4 bg-[#292929] border border-[#B2825E] rounded-lg overflow-hidden">
                <TabsTrigger 
                  value="scores" 
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Scores
                </TabsTrigger>
                <TabsTrigger 
                  value="winnings"
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Winnings
                </TabsTrigger>
                <TabsTrigger 
                  value="skins"
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Skins
                </TabsTrigger>
                <TabsTrigger 
                  value="partners"
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Partners
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="scores" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable 
                      columns={scoreColumns} 
                      data={filteredScores} 
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
                      data={filteredWinnings} 
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
                      data={(() => {
                        // Flatten skins data for DataTable: one row per win, matching WeeklySkins type
                        const rows: SkinsTableRow[] = [];
                        for (const skin of filteredSkins) {
                          const { player_name, week_date, side } = skin;
                          // If winnings is not present, fallback to 5
                          for (let i = 1; i <= 9; i++) {
                            const win: boolean = (skin as Record<string, unknown>)[`hole_${i}_win`] === true;
                            const winningsRaw = (skin as Record<string, unknown>)[`hole_${i}`];
                            const winnings = typeof winningsRaw === "number"
                              ? winningsRaw
                              : typeof winningsRaw === "string"
                                ? parseFloat(winningsRaw)
                                : 5;
                          
                            if (win) {
                              rows.push({
                                player_name,
                                week_date,
                                side,
                                hole: i,
                                winnings,
                                win: true,
                              });
                            }
                          }
                        }
                        return rows;
                      })()}
                      header=""
                      filterItem="player_name"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="partners" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable 
                      columns={partnerColumns} 
                      data={filteredPartners} 
                      header="" 
                      filterItem="player1_name"
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
                    <span className="text-[#EDE6D6] font-semibold">${amount}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
