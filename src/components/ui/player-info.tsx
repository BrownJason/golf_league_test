/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./table";

type Player = {
  player_id: number;
  player_name: string;
  handicap: number;
};

interface PlayerInfoProps {
  player: Player;  // Changed from any to Player type and it's a single object, not an array
  formattedWinnings: string[];
  avg_score: number;
  weeks_played: number;
}

export default function PlayerInfo({ player, formattedWinnings, avg_score, weeks_played }: PlayerInfoProps) {
  return (
    <div className="mx-auto m-4 items-center">
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
          <TableRow className="h-12">
            <TableCell>{player.player_name}</TableCell>
          </TableRow>
          <TableRow className="h-12">
            <TableCell>{player.handicap}</TableCell>
          </TableRow>
          <TableRow className="h-12">
            <TableCell>{formattedWinnings[0]}</TableCell>
          </TableRow>
          <TableRow className="h-12">
            <TableCell>{avg_score.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="h-12">
            <TableCell>{weeks_played}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
