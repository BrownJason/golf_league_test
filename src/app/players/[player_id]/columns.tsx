"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export type PlayerScore = {
  id: number;
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

export const columns: ColumnDef<PlayerScore>[] = [
  {
    accessorKey: "side",
    header: () => <div>Side</div>,
    cell: ({ row }) => {
      const side: string = row.getValue("side");
      return <div className="text-center">{side.replaceAll(side.charAt(0), side.charAt(0).toUpperCase())}</div>;
    },
  },
  {
    accessorKey: "week_date",
    header: "Week Date",
    cell: ({ row }) => {
      const week_date_raw = row.getValue("week_date");
      let week_date = "";
      if (typeof week_date_raw === "string") {
        const [year, month, day] = week_date_raw.split("-");
        week_date = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
      } else if (week_date_raw instanceof Date) {
        week_date = week_date_raw.toISOString().slice(0, 10);
        const [year, month, day] = week_date.split("-");
        week_date = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
      }
      return <div className="text-center">{week_date}</div>;
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = parseInt(row.getValue("score"));
      const par = row.getValue("side") === "front" ? 35 : 46;
      return <div className={clsx(score < par ? "text-red-500 mx-auto text-center" : score > par ? "text-[#C2A878] mx-auto text-center" : "text-[#EDE6D6] text-center")}>{score}</div>;
    },
  },
  {
    accessorKey: "handicap",
    header: "Handicap",
  },
  {
    accessorKey: "adjusted_score",
    header: "Adjusted Score",
    cell: ({ row }) => {
      const adjusted_score = parseInt(row.getValue("adjusted_score"));
      const par = row.getValue("side") === "front" ? 35 : 46;
      return <div className={clsx(adjusted_score < par ? "text-red-500 mx-auto text-center" : adjusted_score > par ? "text-[#C2A878] mx-auto text-center" : "text-[#EDE6D6] text-center")}>{adjusted_score}</div>;
    },
  },
  {
    accessorKey: "hole_1",
    header: "Hole: 1",
    cell: ({ row }) => {
      const hole_1 = parseInt(row.getValue("hole_1"));
      return <div className={clsx(hole_1 < 4 ? "text-red-500 border rounded-full w-6 border-black mx-auto text-center" : hole_1 > 4 ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_1}</div>;
    },
  },
  {
    accessorKey: "hole_2",
    header: "Hole: 2",
    cell: ({ row }) => {
      const hole_2 = parseInt(row.getValue("hole_2"));
      const par = row.getValue("side") === "front" ? 5 : 3;
      return <div className={clsx(hole_2 < par ? "text-red-500 border rounded-full w-6 border-black mx-auto text-center" : hole_2 > par ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_2}</div>;
    },
  },
  {
    accessorKey: "hole_3",
    header: "Hole: 3",
    cell: ({ row }) => {
      const hole_3 = parseInt(row.getValue("hole_3"));
      const par = row.getValue("side") === "front" ? 3 : 4;
      return <div className={clsx(hole_3 < par ? "text-red-500 border rounded-full w-6 border-black mx-auto text-center" : hole_3 > par ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_3}</div>;
    },
  },
  {
    accessorKey: "hole_4",
    header: "Hole: 4",
    cell: ({ row }) => {
      const hole_4 = parseInt(row.getValue("hole_4"));
      return <div className={clsx(hole_4 < 4 ? "text-red-500 border rounded-full w-6 border-black mx-auto text-center" : hole_4 > 4 ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_4}</div>;
    },
  },
  {
    accessorKey: "hole_5",
    header: "Hole: 5",
    cell: ({ row }) => {
      const hole_5 = parseInt(row.getValue("hole_5"));
      return <div className={clsx(hole_5 < 4 ? "text-red-500 border rounded-full w-6 border-black mx-auto text-center" : hole_5 > 4 ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_5}</div>;
    },
  },
  {
    accessorKey: "hole_6",
    header: "Hole: 6",
    cell: ({ row }) => {
      const hole_6 = parseInt(row.getValue("hole_6"));
      return <div className={clsx(hole_6 < 3 ? "text-red-500  border rounded-full w-6 border-black mx-auto text-center" : hole_6 > 3 ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_6}</div>;
    },
  },
  {
    accessorKey: "hole_7",
    header: "Hole: 7",
    cell: ({ row }) => {
      const hole_7 = parseInt(row.getValue("hole_7"));
      return <div className={clsx(hole_7 < 4 ? "text-red-500  border rounded-full w-6 border-black mx-auto text-center" : hole_7 > 4 ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_7}</div>;
    },
  },
  {
    accessorKey: "hole_8",
    header: "Hole: 8",
    cell: ({ row }) => {
      const hole_8 = parseInt(row.getValue("hole_8"));
      return <div className={clsx(hole_8 < 5 ? "text-red-500  border rounded-full w-6 border-black mx-auto text-center" : hole_8 > 5 ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center")}>{hole_8}</div>;
    },
  },
  {
    accessorKey: "hole_9",
    header: "Hole: 9",
    cell: ({ row }) => {
      const hole_9 = parseInt(row.getValue("hole_9"));
      return <div className={clsx(hole_9 < 4 ? "text-red-500  border rounded-full w-6 border-black mx-auto text-center" : hole_9 > 4 ? "text-[#C2A878] border w-6 border-black mx-auto text-center" : "text-[#EDE6D6] text-center  ")}>{hole_9}</div>;
    },
  },
];
