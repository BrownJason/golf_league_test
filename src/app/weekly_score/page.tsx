"use client";

import { fetchWeeklyScores, fetchWeeklySkins, fetchWeeklyWinnings, fetchWeeklyPartners } from "@/lib/api";
import WeekFilter from './week-filter';
import { useEffect, useState } from 'react';
import { WeeklyScore } from "./score-columns";
import { WeeklyWinnings } from "./winnings-columns";
import { WeeklySkins } from "./skins-columns";
import { PartnerScore } from "./partner-columns";
import { GolfBallIcon } from "@/components/ui/BrownFamilyLogoIcon";
import WeeklyResults from "@/components/weekly_stats/weekly_results";
import PerformanceStats from "@/components/weekly_stats/performance_stats";
import SummarizedCard from "@/components/weekly_stats/summarize_card";
import WeeklyTabledInfo from "@/components/weekly_stats/weekly_tabled_info";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// export const metadata: Metadata = {
//   title: 'Weekly Performance | Brown Family Golf',
//   description: 'Track scores and winnings week by week',
// };

// Animated golf-themed SVG background for weekly scores page
const GolfBackground = () => (
  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none animate-fade-in" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.10}}>
    <defs>
      <linearGradient id="golfGradientWeekly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#305D3C"/>
        <stop offset="100%" stopColor="#B2825E"/>
      </linearGradient>
    </defs>
    <ellipse cx="720" cy="320" rx="900" ry="120" fill="url(#golfGradientWeekly)" />
    <circle cx="1240" cy="180" r="30" fill="#EDE6D6" stroke="#B2825E" strokeWidth="4"/>
    <rect x="100" y="200" width="12" height="60" rx="4" fill="#B2825E"/>
    <polygon points="150,210 110,200 110,220" fill="#EDE6D6"/>
  </svg>
);

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

        weeks.push({
          week_date: "all",  
          formatted_date: "All Weeks",
        });

      setAllWeeks(weeks);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-[#9A9540]">Loading...</div>;
  }

  if (selectedWeek === "all") {  
    setSelectedWeek(null);
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

  const sortedScores = filteredScores.slice().sort((a, b) => {
    const dateA = new Date(a.week_date).getTime();
    const dateB = new Date(b.week_date).getTime();
    if (dateA !== dateB) {
      // Sort by week date, most recent first
      return dateB - dateA;
    }
    // If same week, sort by adjusted score, lowest first
    return a.adjusted_score - b.adjusted_score;
  });

  return (
    <div className="p-4 md:p-6 relative overflow-hidden">
      <GolfBackground />
      <main className="max-w mx-auto p-4 md:p-6 animate-fade-in relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#EDE6D6] mb-3 flex items-center justify-center gap-2">
            <GolfBallIcon className="w-7 h-7" /> Weekly Performance
          </h1>
          <div className="h-1 w-24 md:w-32 bg-text mx-auto rounded-full mb-4"></div>
          <p className="text-[#EDE6D6] text-sm md:text-base">
            Track scores and winnings week by week
          </p>
        </div>

        <WeeklyResults weeklyScores={weeklyScores} weeklyWinnings={weeklyWinnings} weeklyPartners={weeklyPartners} weeklySkins={weeklySkins} allWeeks={allWeeks} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <SummarizedCard header={'Total Rounds'} summaryInfo={totalRounds}/> 
          <SummarizedCard header={'Average Score'} summaryInfo={averageScore}/> 
          <SummarizedCard header={'Total Winnings'} summaryInfo={totalWinnings}/> 
          <SummarizedCard header={'Unique Players'} summaryInfo={uniquePlayers}/>
        </div>

        <div className="bg-[#292929] border border-[#B2825E] rounded-xl overflow-hidden shadow shadow-black shadow-lg">
          <div className="mb-6 flex justify-start items-center gap-4 px-4 pt-4 md:px-6 md:pt-6">
            <h2 className="text-[#EDE6D6] text-sm font-medium">Select Week:</h2>
            <WeekFilter weeks={allWeeks} selectedWeek={selectedWeek ?? "all"} onChange={setSelectedWeek} />
          </div>
          <WeeklyTabledInfo sortedScores={sortedScores} filteredWinnings={filteredWinnings} filteredSkins={filteredSkins} filteredPartners={filteredPartners} />
        </div>

        <PerformanceStats filteredScores={filteredScores} filteredWinnings={filteredWinnings}/>
        
      </main>

      {/* Floating Back to Top Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-[#305D3C] text-[#EDE6D6] rounded-full shadow-lg hover:bg-[#B2825E] transition flex items-center gap-2 p-3 animate-fade-in"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <GolfBallIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
