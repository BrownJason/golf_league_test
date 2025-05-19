/* eslint-disable @typescript-eslint/no-explicit-any */
import { columns } from "./columns";
import WeekFilter from "./handlefilter";
import { DataTable } from "@/components/ui/data-table";
import { fetchPlayer, fetchPlayerScores, fetchPlayerScoresByWeek, fetchPlayerWinnings, fetchWeeksByPlayer, fetchScorecard, fetchPeers, fetchWeeklyPartners, fetchWeeklySkins } from "@/lib/api";
import { WeeklyScore } from "@/app/weekly_score/score-columns";
import PlayerStats from "@/components/player_stats/player_stats";

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
    const [player, playerScores, playerWinnings, distinctWeeks, scorecard, peers, allPartners, allSkins] = await Promise.all([
      fetchPlayer(parseInt(player_id)),
      selectedWeek ? fetchPlayerScoresByWeek(parseInt(player_id), selectedWeek.replaceAll('/','')) : fetchPlayerScores(parseInt(player_id)),
      fetchPlayerWinnings(parseInt(player_id)),
      fetchWeeksByPlayer(parseInt(player_id)),
      fetchScorecard(),
      fetchPeers(),
      fetchWeeklyPartners(),
      fetchWeeklySkins(),
    ]);

    // Filter partner scores for this player
    const playerPartners = allPartners.filter((p: any) => p.player1_id === parseInt(player_id) || p.player2_id === parseInt(player_id));
    // Filter skins for this player
    const playerSkins = allSkins.filter((s: any) => s.player_id === parseInt(player_id));

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


    const scorecardData = scorecard;

    let par3 = 0;
    let par4 = 0;
    let par5 = 0;

    for (const score of playerScores) {
      scorecardData.map((res: any) => {
        let isFront = false;
        let isBack = false;
        if(score.side === 'front'){
           isFront = res.side === 'front';
        }
        if(score.side === 'back'){
          isBack = res.side === 'back';
        }

        // Check if the current score belongs to the front or back side
        if (isFront || isBack) {
          // Loop through holes 1 to 9
          for (let hole = 1; hole <= 9; hole++) {
            const scoreHole = score[`hole_${hole}` as keyof typeof score];
            const resHole = res[`hole_${hole}` as keyof typeof res];

            // Increment counters based on hole type
            if (hole === 1 || hole === 4 || hole === 5 || hole === 7 || hole === 9 || (isBack && hole === 3) ) {
              par4 += scoreHole <= resHole ? 1 : 0; // Par 4 holes
            } else if ((isFront && hole === 2) || hole === 8) {
              par5 += scoreHole <= resHole ? 1 : 0; // Par 5 holes
            } else if ( hole === 6 || (isFront && hole === 3) || (isBack && hole === 2)) {
              par3 += scoreHole <= resHole ? 1 : 0; // Par 3 holes
            }
          }
        }
      });
    }

    return (
      <div className="p-4 md:p-6">
        {/* Player Header Section - Made more compact on mobile */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#EDE6D6] text-center mb-2 px-2">
            {player.player_name}
          </h1>
          <div className="h-1 w-24 md:w-32 bg-[#EDE6D6] mx-auto rounded-full"></div>
        </div>

        {/* Winnings Section */}
        {formattedWinnings.length > 0 && formattedWinnings[0] !== "$.00" ? (
          <div className="mb-6 md:mb-8 max-w-4xl mx-auto">
            <div className="bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6] shadow-lg mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-[#EDE6D6] mb-4 md:mb-6">Season Winnings</h2>
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {/* Winnings Breakdown - Above chart on mobile */}
                <div className="space-y-3 order-1">
                  {Object.entries(playerWinnings[0]).map(([category, amount]) => {
                    if (category !== 'player_id' && category !== 'total') {
                      return (
                        <div key={category} className="flex justify-between items-center border-b border-[#EDE6D6] pb-2">
                          <span className="text-[#EDE6D6] capitalize text-sm md:text-base">
                            {category.replace('_', ' ')}
                          </span>
                          <span className="text-[#EDE6D6] text-sm md:text-base">
                            ${Number(amount).toFixed(2)}
                          </span>
                        </div>
                      );
                    }
                  })}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[#EDE6D6] font-bold text-sm md:text-base">Total</span>
                    <span className="text-[#EDE6D6] font-bold text-sm md:text-base">{formattedWinnings[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6] shadow-lg mb-6 md:mb-8 text-center">
            <p className="text-[#EDE6D6]">No winnings recorded yet</p>
          </div>
        )}

        {/* Stats Grid - Single column on mobile, three columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Handicap Card */}
          <div className="bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6] shadow-lg">
            <h3 className="text-[#EDE6D6] text-base md:text-lg font-semibold mb-1 md:mb-2">Current Handicap</h3>
            <p className="text-2xl md:text-3xl text-[#EDE6D6]">{player.handicap}</p>
          </div>

          {/* Starting Average Card */}
          <div className="bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6] shadow-lg">
            <h3 className="text-[#EDE6D6] text-base md:text-lg font-semibold mb-1 md:mb-2">Starting Average</h3>
            <p className="text-2xl md:text-3xl text-[#EDE6D6]">{player.avg !== null ? player.avg.toFixed(1) : 0}</p>
          </div>

          {/* Average Score Card */}
          <div className="bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6] shadow-lg">
            <h3 className="text-[#EDE6D6] text-base md:text-lg font-semibold mb-1 md:mb-2">Average Score</h3>
            <p className="text-2xl md:text-3xl text-[#EDE6D6]">{avgScore.toFixed(1)}</p>
          </div>

          {/* Weeks Played Card */}
          <div className="bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6] shadow-lg">
            <h3 className="text-[#EDE6D6] text-base md:text-lg font-semibold mb-1 md:mb-2">Weeks Played</h3>
            <p className="text-2xl md:text-3xl text-[#EDE6D6]">{weeksPlayed}</p>
          </div>

          {/* Current Winnings Card */}
          <div className="bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6] shadow-lg">
            <h3 className="text-[#EDE6D6] text-base md:text-lg font-semibold mb-1 md:mb-2">Current Winnings</h3>
            <p className="text-2xl md:text-3xl text-[#EDE6D6]">{formattedWinnings}</p>
          </div>
        </div>

        {/* Scores Section */}
        {weeksPlayed > 0 && (
          <div className="bg-[#292929] rounded-xl border border-[#EDE6D6] shadow-lg overflow-hidden">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#EDE6D6] mb-4">Score History</h2>
              <div className="mb-4">
                <WeekFilter weeks={distinctWeeks} selectedWeek={selectedWeek} />
              </div>
            </div>
            {/* Table with horizontal scroll on mobile */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#EDE6D6] scrollbar-track-[#1A1A1A] m-4">
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

        {/* Partner Scores Section */}
        {playerPartners.length > 0 && (
          <div className="bg-[#292929] rounded-xl border border-[#EDE6D6] shadow-lg overflow-hidden mt-8">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#EDE6D6] mb-4">Partner Scores</h2>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#EDE6D6] scrollbar-track-[#1A1A1A] border border-[#EDE6D6] rounded-xl">
                <div className="min-w-[640px]">
                  <table className="min-w-full text-sm text-[#EDE6D6] bg-[#305D3C] rounded-xl">
                    {/* Table Header */}
                    <thead>
                      <tr>
                        <th className="p-2 border-b border-[#EDE6D6]">Week</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Partner</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Score</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Partner Score</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Combined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerPartners.map((ps: any) => {
                        const isPlayer1 = ps.player1_id === parseInt(player_id);
                        const partnerName = isPlayer1 ? ps.player2_name : ps.player1_name;
                        const playerScore = isPlayer1 ? ps.player1_score : ps.player2_score;
                        const playerHandicap = isPlayer1 ? ps.player1_handicap : ps.player2_handicap;
                        const partnerHandicap = isPlayer1 ? ps.player2_handicap : ps.player1_handicap;
                        const adjustedScore = playerScore - playerHandicap;
                        const partnerScore = isPlayer1 ? ps.player2_score : ps.player1_score;
                        const combined = adjustedScore;
                        // Format week_date as MM/DD/YYYY
                        let week_date = "";
                        if (typeof ps.week_date === "string") {
                          const [year, month, day] = ps.week_date.split("-");
                          week_date = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
                        } else if (ps.week_date instanceof Date) {
                          week_date = ps.week_date.toISOString().slice(0, 10);
                          const [year, month, day] = week_date.split("-");
                          week_date = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
                        }
                        return (
                          <tr key={ps.id}>
                            <td className="p-2 border-b border-[#EDE6D6] text-center">{week_date}</td>
                            <td className="p-2 border-b border-[#EDE6D6] text-center">{partnerName}</td>
                            <td className="p-2 border-b border-[#EDE6D6] text-center">{playerScore + ' - ' + playerHandicap + ' : ' + (playerScore - playerHandicap)}</td>
                            <td className="p-2 border-b border-[#EDE6D6] text-center">{partnerScore + ' - ' + partnerHandicap + ' : ' +(partnerScore - partnerHandicap)}</td>
                            <td className="p-2 border-b border-[#EDE6D6] text-center">{combined}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skins Section */}
        {playerSkins.length > 0 && (
          <div className="bg-[#292929] rounded-xl border border-[#EDE6D6] shadow-lg overflow-hidden mt-8">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#EDE6D6] mb-4">Skins</h2>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#EDE6D6] scrollbar-track-[#1A1A1A] border border-[#EDE6D6] rounded-xl">
                <div className="min-w-[640px]">
                  <table className="min-w-full text-sm text-[#EDE6D6] bg-[#305D3C] rounded-xl">
                    <thead>
                      <tr>
                        <th className="p-2 border-b border-[#EDE6D6]">Week</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Side</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Hole</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Winnings</th>
                        <th className="p-2 border-b border-[#EDE6D6]">Win</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerSkins.map((skin: any) => {
                        // Format week_date as MM/DD/YYYY
                        let week_date = "";
                        if (typeof skin.week_date === "string") {
                          const [year, month, day] = skin.week_date.split("-");
                          week_date = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
                        } else if (skin.week_date instanceof Date) {
                          week_date = skin.week_date.toISOString().slice(0, 10);
                          const [year, month, day] = week_date.split("-");
                          week_date = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
                        }
                        // Show all holes with win
                        return Array.from({ length: 9 }, (_, i) => {
                          const holeNum = i + 1;
                          const win = skin[`hole_${holeNum}_win`];
                          if (!win) return null;
                          const winnings = skin[`hole_${holeNum}`];
                          return (
                            <tr key={skin.id + '-' + holeNum}>
                              <td className="p-2 border-b border-[#EDE6D6] text-center">{week_date}</td>
                              <td className="p-2 border-b border-[#EDE6D6] text-center">{skin.side.replace(skin.side.charAt(0), skin.side.charAt(0).toUpperCase())}</td>
                              <td className="p-2 border-b border-[#EDE6D6] text-center">{holeNum}</td>
                              <td className="p-2 border-b border-[#EDE6D6] text-center"> {Number(winnings).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                              <td className="p-2 border-b border-[#EDE6D6] text-center">🏆</td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Trends Section */}
        {weeksPlayed > 0 && (
          <PlayerStats playerScores={playerScores} par3={par3} par4={par4} par5={par5} peers={peers} player_name={player.player_name} 
            playerWinnings={playerWinnings} 
            avgScore={avgScore} 
            player={player} 
            weeksPlayed={weeksPlayed} 
            formattedWinnings={formattedWinnings} 
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <div className="text-[#EDE6D6]">Error loading player data</div>
      </div>
    );
  }
}


