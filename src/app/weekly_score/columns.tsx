"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import Link from "next/link";

export type WeeklyScore = {
  id: number;
  player_id: number;
  player_name: string;
  score: number;
  handicap: number;
  adjusted_score: number;
  hole_1: number;
  hole_2: number;
  hole_3: number;
  hole_4: number;
  hole_5: number;
  hole_6: number;
  hole_7: number;
  hole_8: number;
  hole_9: number;
  week_date: Date;
  side: string;
};

export const columns: ColumnDef<WeeklyScore>[] = [
  {
    accessorKey: "player_id",
    header: () => <div className="hidden">Player Id</div>,
    cell: ({ row }) => {
      const player_id = parseInt(row.getValue("player_id"));
      return <div className="hidden">{player_id}</div>;
    },
  },
  {
    accessorKey: "side",
    header: () => <div className="hidden">Side</div>,
    cell: ({ row }) => {
      const side: string = row.getValue("side");
      return <div className="hidden">{side}</div>;
    },
  },
  {
    accessorKey: "player_name",
    header: () => <div className="text-left">Player Name</div>,
    cell: ({ row }) => {
      const player_name: string = row.getValue("player_name");
      return <Link href={"/players/" + row.getValue("player_id")}>{player_name}</Link>;
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "handicap",
    header: "Handicap",
  },
  {
    accessorKey: "adjusted_score",
    header: "Adjusted Score",
  },
  {
    accessorKey: "hole_1",
    header: "Hole: 1",
    cell: ({ row }) => {
      const hole_1 = parseInt(row.getValue("hole_1"));
      return <div className={clsx(hole_1 < 4 ? "text-green-400 border rounded-full w-6 border-black mx-auto" : hole_1 > 4 ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_1}</div>;
    },
  },
  {
    accessorKey: "hole_2",
    header: "Hole: 2",
    cell: ({ row }) => {
      const hole_2 = parseInt(row.getValue("hole_2"));
      const par = row.getValue("side") === "front" ? 5 : 3;
      return <div className={clsx(hole_2 < par ? "text-green-400 border rounded-full w-6 border-black mx-auto" : hole_2 > par ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_2}</div>;
    },
  },
  {
    accessorKey: "hole_3",
    header: "Hole: 3",
    cell: ({ row }) => {
      const hole_3 = parseInt(row.getValue("hole_3"));
      const par = row.getValue("side") === "front" ? 3 : 4;
      return <div className={clsx(hole_3 < par ? "text-green-400 border rounded-full w-6 border-black mx-auto" : hole_3 > par ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_3}</div>;
    },
  },
  {
    accessorKey: "hole_4",
    header: "Hole: 4",
    cell: ({ row }) => {
      const hole_4 = parseInt(row.getValue("hole_4"));
      return <div className={clsx(hole_4 < 4 ? "text-green-400 border rounded-full w-6 border-black mx-auto" : hole_4 > 4 ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_4}</div>;
    },
  },
  {
    accessorKey: "hole_5",
    header: "Hole: 5",
    cell: ({ row }) => {
      const hole_5 = parseInt(row.getValue("hole_5"));
      return <div className={clsx(hole_5 < 4 ? "text-green-400 border rounded-full w-6 border-black mx-auto" : hole_5 > 4 ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_5}</div>;
    },
  },
  {
    accessorKey: "hole_6",
    header: "Hole: 6",
    cell: ({ row }) => {
      const hole_6 = parseInt(row.getValue("hole_6"));
      return <div className={clsx(hole_6 < 4 ? "text-green-400  border rounded-full w-6 border-black mx-auto" : hole_6 > 4 ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_6}</div>;
    },
  },
  {
    accessorKey: "hole_7",
    header: "Hole: 7",
    cell: ({ row }) => {
      const hole_7 = parseInt(row.getValue("hole_7"));
      return <div className={clsx(hole_7 < 4 ? "text-green-400  border rounded-full w-6 border-black mx-auto" : hole_7 > 4 ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_7}</div>;
    },
  },
  {
    accessorKey: "hole_8",
    header: "Hole: 8",
    cell: ({ row }) => {
      const hole_8 = parseInt(row.getValue("hole_8"));
      return <div className={clsx(hole_8 < 5 ? "text-green-400  border rounded-full w-6 border-black mx-auto" : hole_8 > 5 ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_8}</div>;
    },
  },
  {
    accessorKey: "hole_9",
    header: "Hole: 9",
    cell: ({ row }) => {
      const hole_9 = parseInt(row.getValue("hole_9"));
      return <div className={clsx(hole_9 < 4 ? "text-green-400  border rounded-full w-6 border-black mx-auto" : hole_9 > 4 ? "text-red-600 border w-6 border-black mx-auto" : "text-black")}>{hole_9}</div>;
    },
  },
];
