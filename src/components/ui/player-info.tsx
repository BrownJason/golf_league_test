/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./table";

export default function PlayerInfo({ player, formattedWinnings, avg_score, weeks_played }: { player: any; formattedWinnings: any; avg_score: any; weeks_played: any }) {
  return (
    <div className="mx-auto m-4 items-center">
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
            <TableRow className="h-12">
              <TableHead>Weeks Played:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="flex flex-col justify-start">
            {player.map((res: any) => {
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
                  <TableRow className="h-12">
                    <TableCell>{weeks_played}</TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
