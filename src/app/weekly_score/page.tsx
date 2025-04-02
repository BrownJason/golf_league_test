import { fetchWeeklyWinnings, fetchWeeklyScores } from "../data/data";
import { DataTable } from "../../components/ui/data-table";
import { scoreColumns } from "./score-columns";
import { winningsColumns } from "./winnings-columns";

export default async function Page() {
  const weekly_scores = await fetchWeeklyScores();
  const weekly_winnings = await fetchWeeklyWinnings();

  return (
    <div className="mx-auto py-10 items-center">
      <DataTable columns={scoreColumns} data={weekly_scores} header={"Scores by Week"} filterItem="player_name" />
      <DataTable columns={winningsColumns} data={weekly_winnings} header={"Winnings by Week"} filterItem="player_name" />
    </div>
  );
}
