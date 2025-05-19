'use client';

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type PartnerScore = {
  id: number;
  player1_id: number;
  player2_id: number;
  player1_name: string;
  player2_name: string;
  player1_score: number;
  player2_score: number;
  player1_handicap: number;
  player2_handicap: number;
  combined_score: number;
  week_date: Date;
};

export const partnerColumns: ColumnDef<PartnerScore>[] = [
  {
    accessorKey: "player1_name",
    header: () => <div className="text-center">Player 1</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("player1_name")}</div>,
  },
  {
    accessorKey: "player2_name",
    header: () => <div className="text-center">Player 2</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("player2_name")}</div>,
  },
  {
    accessorKey: "player1_score",
    header: () =>  <div className="text-center">Player 1 Score</div>,
    cell: ({ row }) => {
      const player1Score = Number(row.getValue("player1_score"));
      const player1Handicap = Number(row.getValue("player1_handicap"));
      const adjustedScore = player1Score - player1Handicap;

      return (
        <div className="text-center">
          {player1Score + ' - ' + player1Handicap + ': ' + adjustedScore}  
        </div>
      );
    },
  },
  {
    accessorKey: "player2_score",
    header: () => <div className="text-center">Player 2 Score</div>,
    cell: ({ row }) => {
      const player2Score = Number(row.getValue("player2_score"));
      const player2Handicap = Number(row.getValue("player2_handicap"));
      const adjustedScore = player2Score - player2Handicap;

      return (
        <div className="text-center">
          {player2Score  + ' - ' + player2Handicap + ': ' + adjustedScore}
        </div>
      );  
    }
  },
  {
    accessorKey: "player1_handicap",
    header: () => <div className="text-center hidden lg:hidden">Player 1 Handicap</div>,
    cell: ({ row }) => <div className="text-center hidden lg:hidden">{row.getValue("player1_handicap")}</div>,
  },
  {
    accessorKey: "player2_handicap",
    header: () => <div className="text-center hidden lg:hidden">Player 2 Handicap</div>,
    cell: ({ row }) => <div className="text-center hidden lg:hidden">{row.getValue("player2_handicap")}</div>,
  },
  {
    accessorKey: "week_date",
    header: () => <div className="text-center">Week Date</div>,
    cell: ({ row }) => {
      const week_date: string = moment(row.getValue("week_date")).add(1, "days").format("MM/DD/YYYY");
      return <div className="text-center">{week_date}</div>;
    },
  },
  {
    accessorKey: "combined_score",
    header: () => <div className="text-center">Combined Score</div>,
    cell: ({ row }) => <div className="text-center font-bold">{row.getValue("combined_score")}</div>,
  },
];
