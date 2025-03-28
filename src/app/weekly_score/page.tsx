import { fetchWeeklyScores } from "../data/data";
import { columns } from "./columns";
import { WeeklyScoreDataTable } from "./data-table";

export default async function Page() {
  const weekly_scores = await fetchWeeklyScores();

  console.log(weekly_scores);

  return (
    <div className="mx-auto py-10 items-center">
      <WeeklyScoreDataTable columns={columns} data={weekly_scores} />
    </div>
  );
}
