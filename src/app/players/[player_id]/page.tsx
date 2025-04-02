import { fetchPlayer, fetchPlayerScores, fetchPlayerScoresByWeek, fetchPlayerWinnings, fetchWeeks } from "@/app/data/data";
import { columns } from "./columns";
import HandleFilter from "./handlefilter";
import { Fragment } from "react";
import PieChart from "./winning-chart";
import { DataTable } from "@/components/ui/data-table";
import PlayerInfo from "@/components/ui/player-info";

export default async function Page({ params, searchParams }: { params: Promise<{ player_id: number }>; searchParams: Promise<{ week: string }> }) {
  const sp = await searchParams;
  const selectedWeek = String(sp?.week) || null;

  const distinctWeeks = await fetchWeeks();

  const { player_id } = await params;
  const player = await fetchPlayer(player_id);
  const player_scores = await fetchPlayerScores(player_id);
  let player_scores_by_week = player_scores;
  if (selectedWeek !== null && selectedWeek !== "undefined" && selectedWeek !== " ") {
    player_scores_by_week = await fetchPlayerScoresByWeek(player_id, selectedWeek);
  }

  const player_winnings = await fetchPlayerWinnings(player_id);

  let winnings = 0;
  player_winnings.map((res) => {
    winnings = winnings + parseInt(res.skins);
    winnings = winnings + parseInt(res.greens);
    winnings = winnings + parseInt(res.partners);
    winnings = winnings + parseInt(res.best_ball);
    winnings = winnings + parseInt(res.low_score);
  });

  const formattedWinnings = winnings.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const avg_score = player_scores.length === 0 ? 0 : player_scores.map((res) => res.score).reduce((acc, val) => acc + val, 0) / player_scores.length;

  let weeks_played = 0;
  player_scores.forEach((res) => {
    if (res.week_date) {
      weeks_played = weeks_played + 1;
    }
  });

  return (
    <div className="mx-auto items-center">
      <div className="mx-auto items-center">
        <div className="flex flex-col rounded-lg text-[#9A9540] p-4 m-4 bg-[#1A3E2A] md:w-96 border border-[#9A9540] shadow-lg shadow-black text-center justify-center items-center text-lg mx-auto w-78"> Player Info</div>
      </div>
      <div className="flex md:flex-row flex-col mx-auto items-center">
        <PlayerInfo player={player} formattedWinnings={formattedWinnings} avg_score={avg_score} weeks_played={weeks_played} />
        {winnings > 0 ? (
          <div className="mx-auto items-center">
            {" "}
            <PieChart values={player_winnings} />{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mx-auto items-center">
        <HandleFilter week={distinctWeeks} />
        <DataTable columns={columns} data={selectedWeek === null ? player_scores : player_scores_by_week} header="" filterItem="week_date" />
      </div>
    </div>
  );
}
