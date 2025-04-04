import { fetchPlayer, fetchPlayerScores, fetchPlayerScoresByWeek, fetchPlayerWinnings, fetchWeeks } from "@/app/data/data";
import { columns } from "./columns";
import HandleFilter from "./handlefilter";
import PieChart from "./winning-chart";
import { DataTable } from "@/components/ui/data-table";

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

  const formattedWinnings: string[] = player_winnings.map((res) => {
    return res.total;
  });

  console.log(formattedWinnings);
  const avg_score = player_scores.length === 0 ? 0 : player_scores.map((res) => res.score).reduce((acc, val) => acc + val, 0) / player_scores.length;

  let weeks_played = 0;
  player_scores.forEach((res) => {
    if (res.week_date) {
      weeks_played = weeks_played + 1;
    }
  });

  return (
    <div className="mx-auto items-center">
      <div className="flex flex-col mx-auto items-center rounded-lg text-[#9A9540] text-xl p-4 m-4 bg-[#1A3E2A] md:w-96 border border-[#9A9540] shadow-lg shadow-black justify-centertext-lg w-78"> Player Statistics</div>
      {formattedWinnings.length > 0 && formattedWinnings[0] !== "$.00" ? (
        <div className="flex md:flex-row flex-col mx-auto items-center">
          <div className="mx-auto items-center">
            {" "}
            <PieChart values={player_winnings} avg_score={avg_score} player={player} weeks_played={weeks_played} formattedWinnings={formattedWinnings} />{" "}
          </div>
        </div>
      ) : (
        <div className="mx-auto justify-center text-center flex md:flex-row flex-col  rounded-lg text-[#9A9540] p-4 m-4 bg-[#1A3E2A] md:w-96 w-78 border border-[#9A9540] shadow-lg shadow-black">No current winnings</div>
      )}
      {weeks_played > 0 ? (
        <div className="mx-auto items-center">
          <HandleFilter week={distinctWeeks} />
          <DataTable columns={columns} data={selectedWeek === null ? player_scores : player_scores_by_week} header="" filterItem="week_date" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
