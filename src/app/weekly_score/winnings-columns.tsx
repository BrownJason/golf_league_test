"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export type WeeklyWinnings = {
  id: number;
  player_id: number;
  player_name: string;
  skins: string;
  greens: string;
  partners: string;
  best_ball: string;
  low_score: string;
  total: string;
  week_date: Date;
};

export const winningsColumns: ColumnDef<WeeklyWinnings>[] = [
  {
    accessorKey: "player_id",
    header: () => <div className="hidden">Player Id</div>,
    cell: ({ row }) => {
      const player_id = parseFloat(row.getValue("player_id"));
      return <div className="hidden">{player_id}</div>;
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
    accessorKey: "week_date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} title="Sort asc or descending by week date">
          Week Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const week_date: string = moment(row.getValue("week_date")).add(1, "days").format("MM/DD/YYYY");
      return <div className="text-center">{week_date}</div>;
    },
  },
  {
    accessorKey: "skins",
    header: "Skins",
    cell: ({ row }) => {
      const skins: string = parseFloat(row.getValue("skins")).toLocaleString("en-US", { style: "currency", currency: "USD" });
      return <div className="text-center">{skins}</div>;
    },
  },
  {
    accessorKey: "greens",
    header: "Greens",
    cell: ({ row }) => {
      const greens: string = parseFloat(row.getValue("greens")).toLocaleString("en-US", { style: "currency", currency: "USD" });
      return <div className="text-center">{greens}</div>;
    },
  },
  {
    accessorKey: "partners",
    header: "Partners",
    cell: ({ row }) => {
      const partners: string = parseFloat(row.getValue("partners")).toLocaleString("en-US", { style: "currency", currency: "USD" });
      return <div className="text-center">{partners}</div>;
    },
  },
  {
    accessorKey: "best_ball",
    header: "Best Ball",
    cell: ({ row }) => {
      const best_ball: string = parseFloat(row.getValue("best_ball")).toLocaleString("en-US", { style: "currency", currency: "USD" });
      return <div className="text-center">{best_ball}</div>;
    },
  },
  {
    accessorKey: "low_score",
    header: "Low Score",
    cell: ({ row }) => {
      const low_score: string = parseFloat(row.getValue("low_score")).toLocaleString("en-US", { style: "currency", currency: "USD" });
      return <div className="text-center">{low_score}</div>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const partners: number = parseFloat(row.getValue("partners"));
      const greens: number = parseFloat(row.getValue("greens"));
      const skins: number = parseFloat(row.getValue("skins"));
      const low_score: number = parseFloat(row.getValue("low_score"));
      const best_ball: number = parseFloat(row.getValue("best_ball"));
      const totals = (partners + greens + skins + low_score + best_ball).toLocaleString("en-US", { style: "currency", currency: "USD" });
      return <div className="text-center">{totals}</div>;
    },
  },
];
