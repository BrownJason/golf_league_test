"use client";
import { Trophy } from "lucide-react";
import { GolfFlagIcon, GolfClubIcon, GolfBallIcon } from "../ui/BrownFamilyLogoIcon";
import { WeeklyScore } from "@/app/weekly_score/score-columns";
import { WeeklyWinnings } from "@/app/weekly_score/winnings-columns";
import { PartnerScore } from "@/app/weekly_score/partner-columns";
import { WeeklySkins } from "@/app/weekly_score/skins-columns";

export default function WeeklyResults({weeklyScores, weeklyWinnings, weeklyPartners, weeklySkins, allWeeks}:
  {weeklyScores: WeeklyScore[], weeklyWinnings: WeeklyWinnings[], weeklyPartners: PartnerScore[], weeklySkins: WeeklySkins[], allWeeks: { week_date: string; formatted_date: string }[]}
) {
   function getWeekDateString(week_date: string | Date): string {
      if (typeof week_date === 'string') return week_date;
      if (week_date && typeof week_date === 'object' && 'toISOString' in week_date && typeof week_date.toISOString === 'function') {
        return week_date.toISOString().slice(0, 10);
      }
      return '';
    };

    return (
      <>
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allWeeks.slice(0,3).map((week, idx) => {
            const weekScores = weeklyScores.filter(s => getWeekDateString(s.week_date) === week.week_date);
            const weekWinnings = weeklyWinnings.filter(w => getWeekDateString(w.week_date) === week.week_date);
            const weekSkins = weeklySkins.filter(s => getWeekDateString(s.week_date) === week.week_date);
            const weekPartners = weeklyPartners.filter(p => getWeekDateString(p.week_date) === week.week_date);
            const weekGreens = weeklyWinnings.filter(w => getWeekDateString(w.week_date) === week.week_date).filter(w => Number.parseFloat(w.greens) > 0);
            const weekBestball = weeklyWinnings.filter(w => getWeekDateString(w.week_date) === week.week_date).filter(w => Number.parseFloat(w.best_ball) > 0);
            
            if (!weekScores.length) return null;
            const topScore = Math.min(...weekScores.filter(w => {
              for (const pName of weekWinnings) {
                if (w.player_name === pName.player_name && Number.parseFloat(pName.low_score) > 0.0) {
                  return pName;
                }
              }
            }).map(s => s.adjusted_score));
            const topPlayer = weekScores.find(s => s.adjusted_score === topScore)?.player_name;
            const secondScore = Math.min(...weekScores.filter(w => {
              for (const pName of weekWinnings) {
                if ((w.player_name === pName.player_name && w.player_name !== topPlayer)
                  && Number.parseFloat(pName.low_score) > 0.0) {
                  return pName;
                }
              }
            }).map(s => s.adjusted_score));
            const secondPlayer = weekScores.filter(s => s.player_name !== topPlayer).find(s => s.adjusted_score === secondScore)?.player_name;
            
            const thirdScore = Math.min(...weekScores.filter(w => {
              for (const pName of weekWinnings) {
                if ((w.player_name === pName.player_name && w.player_name !== topPlayer && w.player_name !== secondPlayer)
                  && Number.parseFloat(pName.low_score) > 0.0) {
                  return pName;
                }
              }
            }).map(s => s.adjusted_score));
            const thirdPlayer = weekScores.filter(s => s.player_name !== topPlayer && s.player_name !== secondPlayer).find(s => s.adjusted_score === thirdScore)?.player_name;

            const winningsByPlayer = weekWinnings.reduce((acc, win) => {
              const total = parseFloat(win.skins) + parseFloat(win.greens) + parseFloat(win.partners) + parseFloat(win.best_ball) + parseFloat(win.low_score);
              acc[win.player_name] = (acc[win.player_name] || 0) + total;
              return acc;
            }, {} as Record<string, number>);
            const topEarner = Object.entries(winningsByPlayer).sort(([,a],[,b]) => b-a)[0]?.[0];

            const isTopWeek = idx === 0;
            return (
              <div key={week.week_date} className="relative bg-[#292929] border border-[#B2825E] rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 animate-fade-in group overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#EDE6D6] text-lg">{week.formatted_date}</span>
                  {isTopWeek && (
                    <span className="text-yellow-400 flex items-center gap-1 font-semibold"><Trophy className="w-5 h-5 inline" /> Top Week</span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GolfFlagIcon className="w-4 h-4" />
                    <span className="text-[#EDE6D6]">Low Score:</span>
                    { topScore === secondScore && secondScore === thirdScore
                      ? (<>
                        <span className="font-semibold text-[#B2825E]">Tied: {topPlayer} ({topScore})</span>
                        <span className="font-semibold text-[#B2825E]">Tied: {secondPlayer} ({secondScore})</span>
                        <span className="font-semibold text-[#B2825E]">Tied: {thirdPlayer} ({thirdScore})</span>
                      </>
                      )
                       : secondScore === thirdScore && (isFinite(secondScore) && isFinite(thirdScore))
                       ?
                       (
                        <>
                        <span className="font-semibold text-[#B2825E]">1st: {topPlayer} ({topScore})</span>
                        <span className="font-semibold text-[#B2825E]">Tied: {secondPlayer} ({secondScore})</span>
                        <span className="font-semibold text-[#B2825E]">Tied: {thirdPlayer} ({thirdScore})</span>
                      </>
                        ) : (
                        <><span className="font-semibold text-[#B2825E]">1st: {topPlayer} ({topScore})</span>
                        { secondPlayer && secondScore && <span className="font-semibold text-[#EDE6D6]">2nd: {secondPlayer} ({secondScore})</span>}
                        {  thirdPlayer && thirdScore &&
                          <span className="font-semibold text-[#EDE6D6]">3rd: {thirdPlayer} ({thirdScore})</span>
                        } 
                        </>
                        )

                    }
                    
                  </div>
                  <div className="flex items-center gap-2">
                    <GolfClubIcon className="w-4 h-4" />
                    <span className="text-[#EDE6D6]">Top Earner:</span>
                    <span className="font-semibold text-[#B2825E]">{topEarner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GolfBallIcon className="w-4 h-4" />
                    <span className="text-[#EDE6D6]">Rounds:</span>
                    <span className="font-semibold">{weekScores.length}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GolfBallIcon className="w-4 h-4" />
                    <span className="text-[#EDE6D6]">Greens:</span>
                    <div className="flex flex-col gap-1 font-semibold">{(() => {
                      const greensList: string[] = [];
                      for (const greens of weekGreens) {
                        greensList.push(`${greens.player_name} ($${greens.greens})`);
                      }

                      return greensList.length > 0 ?
                      greensList.map((s, idx) => <span key={idx} className="text-[#B2825E]">{s}</span>)
                          : <span className="text-[#B2825E]">None</span>;
                    })()}</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GolfBallIcon className="w-4 h-4 rotate-45 mt-1" />
                    <span className="text-[#EDE6D6]">Skins:</span>
                    <div className="flex flex-col gap-0.5 font-semibold">
                      {(() => {
                        const skinsList: string[] = [];
                        for (const skin of weekSkins) {
                          for (let i = 1; i <= 9; i++) {
                            const win: boolean = (skin as Record<string, unknown>)[`hole_${i}_win`] === true;
                            if (win) {
                              skinsList.push(`${skin.player_name} (Hole ${i})`);
                            }
                          }
                        }
                        return skinsList.length > 0
                          ? skinsList.map((s, idx) => <span key={idx} className="text-[#B2825E]">{s}</span>)
                          : <span className="text-[#B2825E]">None</span>;
                      })()}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GolfClubIcon className="w-4 h-4 rotate-12 mt-1" />
                    <span className="text-[#EDE6D6]">Partners:</span>
                    <div className="flex flex-col gap-0.5 font-semibold">
                      {(() => {
                        if (!weekPartners.length) return <span className="text-[#B2825E]">None</span>;
                        let bestPair = null;
                        let bestScore = Infinity;
                        for (const p of weekPartners) {
                          if (typeof p.combined_score === 'number' && p.combined_score < bestScore) {
                            if (weeklyWinnings.some(w => w.player_name === p.player1_name && Number.parseFloat(w.partners) > 0) &&
                                weeklyWinnings.some(w => w.player_name === p.player2_name && Number.parseFloat(w.partners) > 0)) {
                              bestScore = p.combined_score;
                              bestPair = p;
                            }
                          }
                        }
                        return bestPair
                          ? <span className="text-[#B2825E]">{bestPair.player1_name} &amp; {bestPair.player2_name}: {bestScore}</span>
                          : <span className="text-[#B2825E]">None</span>;
                      })()}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GolfFlagIcon className="w-4 h-4" />
                    <span className="text-[#EDE6D6]">Best Ball:</span>
                    <div className="flex flex-col gap-1 font-semibold">{(() => {
                      const bestBallList: string[] = [];
                      for (const bestball of weekBestball) {
                        bestBallList.push(`${bestball.player_name} ($${bestball.best_ball})`);
                      }

                      return bestBallList.length > 0 ?
                      bestBallList.map((s, idx) => <span key={idx} className="text-[#B2825E]">{s}</span>)
                          : <span className="text-[#B2825E]">None</span>;
                    })()}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#305D3C]/30 to-[#B2825E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none" />
              </div>
            );
          })}
        </div>
        </>
    );
}