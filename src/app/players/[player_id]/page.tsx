import { fetchPlayer, fetchPlayerScores, fetchPlayerScoresByWeek, fetchPlayerWinnings, fetchWeeks } from "@/app/data/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlayerScoreDataTable } from "./data-table";
import { columns } from "./columns";
import HandleFilter from "./handlefilter";
import { Fragment } from "react";
import PieChart from "./winning-chart";

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
    winnings = winnings + res.skins;
    winnings = winnings + res.greens;
    winnings = winnings + res.partners;
  });

  const formattedWinnings = winnings.toLocaleString("en-US", { style: "currency", currency: "USD" });
  console.log(winnings);

  const avg_score = player_scores.map((res) => res.score).reduce((acc, val) => acc + val, 0) / player_scores.length;

  //Change later to use player id to pull from weekly score/weekly winnings rather than
  return (
    <div className="mx-auto py-10 items-center">
      <div className="mx-auto m-4 items-center">
        <div className="flex flex-col rounded-lg text-[#9A9540] p-4 m-4 bg-[#1A3E2A] md:w-96 border border-[#9A9540] shadow-lg shadow-black text-center justify-center items-center text-lg mx-auto w-78"> Player Info</div>
      </div>
      <div className="flex md:flex-row flex-col mx-auto justify-center items-center">
        <div className="mx-auto items-center w-78">
          <div className="flex flex-col justify-start rounded-lg text-[#9A9540] p-4 m-4 bg-[#1A3E2A] md:w-96 border border-[#9A9540] shadow-lg shadow-black ">
            <Table className="flex flex-row w-full text-lg text-center items-center justify-center">
              <TableHeader className="flex flex-col justify-start w-full">
                <TableRow className="h-12">
                  <TableHead>Player:</TableHead>
                </TableRow>
                <TableRow className="h-12">
                  <TableHead>Handicap:</TableHead>
                </TableRow>
                <TableRow className="h-12">
                  <TableHead>Current Winnings:</TableHead>
                </TableRow>
                <TableRow className="h-12">
                  <TableHead>Average Score:</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="flex flex-col justify-start">
                {player.map((res) => {
                  return (
                    <Fragment key={res.player_id}>
                      <TableRow className="h-12">
                        <TableCell>{res.player_name}</TableCell>
                      </TableRow>
                      <TableRow className="h-12">
                        <TableCell>{res.handicap}</TableCell>
                      </TableRow>
                      <TableRow className="h-12">
                        <TableCell>{formattedWinnings}</TableCell>
                      </TableRow>
                      <TableRow className="h-12">
                        <TableCell>{avg_score}</TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mx-auto items-center">
          <PieChart values={player_winnings} />
        </div>
      </div>
      <div className="mx-auto items-center">
        <HandleFilter week={distinctWeeks} />
        <PlayerScoreDataTable columns={columns} data={selectedWeek === null ? player_scores : player_scores_by_week} />
      </div>
    </div>
  );
}
