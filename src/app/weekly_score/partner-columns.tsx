'use client';

import { ColumnDef } from "@tanstack/react-table";

export type PartnerScore = {
  id: number;
  player1_id: number;
  player2_id: number;
  player1_name: string;
  player2_name: string;
  player1_score: number;
  player2_score: number;
  combined_score: number;
  week_date: string;
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
    header: () => <div className="text-center">Player 1 Score</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("player1_score")}</div>,
  },
  {
    accessorKey: "player2_score",
    header: () => <div className="text-center">Player 2 Score</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("player2_score")}</div>,
  },
  {
    accessorKey: "combined_score",
    header: () => <div className="text-center">Combined Score</div>,
    cell: ({ row }) => <div className="text-center font-bold">{row.getValue("combined_score")}</div>,
  },
];
