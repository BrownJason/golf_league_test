import { fetchWeeklyWinnings, fetchWeeklyScores } from "../data/data";
import { scoreColumns } from "./score-columns";
import { WeeklyScoreDataTable } from "./weekly-score-data-table";
import { winningsColumns } from "./winnings-columns";
import { WinningsDataTable } from "./winnings-data-table";

export default async function Page() {
  const weekly_scores = await fetchWeeklyScores();
  const weekly_winnings = await fetchWeeklyWinnings();

  return (
    <div className="mx-auto py-10 items-center">
      <WeeklyScoreDataTable columns={scoreColumns} data={weekly_scores} />
      <WinningsDataTable columns={winningsColumns} data={weekly_winnings} />
    </div>
  );
}
