import { fetchPlayer, fetchPlayerScores, fetchPlayerScoresByWeek, fetchWeeks } from "@/app/data/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlayerScoreDataTable } from "./data-table";
import { columns } from "./columns";
import HandleFilter from "./handlefilter";
import { Fragment } from "react";

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
  //const player_winnings = await fetchPlayerWinnings(player_id);

  //Change later to use player id to pull from weekly score/weekly winnings rather than
  return (
    <div className="mx-auto py-10 items-center">
      <div className="mx-auto items-center">
        <div className="flex flex-col m-4 rounded-lg">
          <div className="mx-auto bg-[#1A3E2A] border border-[#9A9540] shadow-lg shadow-black rounded-xl p-4 text-2xl mb-4">Player Info</div>
          <div className="rounded-xl border text-[#9A9540] bg-[#1A3E2A] border-[#9A9540] shadow-lg shadow-black md:max-h-128 overflow-auto md:w-96">
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
                        <TableCell>$0</TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="mx-auto items-center">
        <HandleFilter week={distinctWeeks} />
        <PlayerScoreDataTable columns={columns} data={selectedWeek === null ? player_scores : player_scores_by_week} />
      </div>
    </div>
  );
}
