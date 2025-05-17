"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export type WeeklySkins = {
  id: number;
  player_id: number;
  player_name: string;
  score: number;
  handicap: number;
  adjusted_score: number;
  hole_1: number;
  hole_1_win: boolean;
  hole_2: number;
  hole_2_win: boolean;
  hole_3: number;
  hole_3_win: boolean;
  hole_4: number;
  hole_4_win: boolean;
  hole_5: number;
  hole_5_win: boolean;
  hole_6: number;
  hole_6_win: boolean;
  hole_7: number;
  hole_7_win: boolean;
  hole_8: number;
  hole_8_win: boolean;
  hole_9: number;
  hole_9_win: boolean;
  week_date: Date;
  side: string;
};

export const skinsColumns: ColumnDef<WeeklySkins>[] = [
  {
    accessorKey: "player_id",
    header: () => <div className="hidden lg:hidden">Player Id</div>,
    cell: ({ row }) => {
      const player_id = parseInt(row.getValue("player_id"));
      return <div className="hidden lg:hidden">{player_id}</div>;
    },
  },
  {
    accessorKey: "side",
    header: () => <div className="hidden lg:hidden">Side</div>,
    cell: ({ row }) => {
      const side: string = row.getValue("side");
      return <div className="hidden lg:hidden">{side}</div>;
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
    accessorKey: "hole_1_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 1 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_1_win")}</div>
    }
  },
  {
    accessorKey: "hole_2_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 2 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_2_win")}</div>
    }
  },
  {
    accessorKey: "hole_3_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 3 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_3_win")}</div>
    }
  },
  {
    accessorKey: "hole_4_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 4 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_4_win")}</div>
    }
  },
  {
    accessorKey: "hole_5_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 5 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_5_win")}</div>
    }
  },
  {
    accessorKey: "hole_6_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 6 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_6_win")}</div>
    }
  },
  {
    accessorKey: "hole_7_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 7 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_7_win")}</div>
    }
  },
  {
    accessorKey: "hole_8_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 8 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_8_win")}</div>
    }
  },
  {
    accessorKey: "hole_9_win",
    header: () => <div className="w-0 hidden lg:hidden">HOLE 9 WIN</div>,
    cell: ({ row }) => {
        return <div className="w-0 hidden lg:hidden">{row.getValue("hole_9_win")}</div>
    }
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
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = parseInt(row.getValue("score"));
      const par = row.getValue("side") === "front" ? 36 : 35;
      return <div className={clsx(score < par ? "text-red-500 mx-auto text-center" : score > par ? "text-gray-300 mx-auto text-center" : "text-[#EDE6D6] text-center")}>{score}</div>;
    },
  },
  {
    accessorKey: "handicap",
    header: "Handicap",
    cell: ({row}) => {
      return <div className="text-center">{row.getValue("handicap")}</div>
    }
  },
  {
    accessorKey: "adjusted_score",
    header: "Adjusted Score",
    cell: ({ row }) => {
      const adjusted_score = parseInt(row.getValue("adjusted_score"));
      const par = row.getValue("side") === "front" ? 36 : 35;
      return <div className={clsx(adjusted_score < par ? "text-red-500 mx-auto text-center" : adjusted_score > par ? "text-gray-300 mx-auto text-center" : "text-[#EDE6D6] text-center")}>{adjusted_score}</div>;
    },
  },
  {
    accessorKey: "hole_1",
    header: "Hole: 1",
    cell: ({ row }) => {
      const hole_1 = parseInt(row.getValue("hole_1"));
      const hole_1_win = row.getValue("hole_1_win");
      return <div className={clsx(hole_1_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_1}</div>;
    },
  },
  {
    accessorKey: "hole_2",
    header: "Hole: 2",
    cell: ({ row }) => {
      const hole_2 = parseInt(row.getValue("hole_2"));
      const hole_2_win = row.getValue("hole_2_win");
      console.log(hole_2_win)
      return <div className={clsx(hole_2_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_2}</div>;
    },
  },
  {
    accessorKey: "hole_3",
    header: "Hole: 3",
    cell: ({ row }) => {
      const hole_3 = parseInt(row.getValue("hole_3"));
      const hole_3_win = row.getValue("hole_3_win");
      return <div className={clsx(hole_3_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_3}</div>;
    },
  },
  {
    accessorKey: "hole_4",
    header: "Hole: 4",
    cell: ({ row }) => {
      const hole_4 = parseInt(row.getValue("hole_4"));
      const hole_4_win = row.getValue("hole_4_win");
      return <div className={clsx(hole_4_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_4}</div>;
    },
  },
  {
    accessorKey: "hole_5",
    header: "Hole: 5",
    cell: ({ row }) => {
      const hole_5 = parseInt(row.getValue("hole_5"));
      const hole_5_win = row.getValue("hole_5_win");
      return <div className={clsx(hole_5_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_5}</div>;
    },
  },
  {
    accessorKey: "hole_6",
    header: "Hole: 6",
    cell: ({ row }) => {
      const hole_6 = parseInt(row.getValue("hole_6"));
      const hole_6_win = row.getValue("hole_6_win");
      return <div className={clsx(hole_6_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_6}</div>;
    },
  },
  {
    accessorKey: "hole_7",
    header: "Hole: 7",
    cell: ({ row }) => {
      const hole_7 = parseInt(row.getValue("hole_7"));
      const hole_7_win = row.getValue("hole_7_win");
      return <div className={clsx(hole_7_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_7}</div>;
    },
  },
  {
    accessorKey: "hole_8",
    header: "Hole: 8",
    cell: ({ row }) => {
      const hole_8 = parseInt(row.getValue("hole_8"));
      const hole_8_win = row.getValue("hole_8_win");
      return <div className={clsx(hole_8_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_8}</div>;
    },
  },
  {
    accessorKey: "hole_9",
    header: "Hole: 9",
    cell: ({ row }) => {
      const hole_9 = parseInt(row.getValue("hole_9"));
      const hole_9_win = row.getValue("hole_9_win");
      return <div className={clsx(hole_9_win ? "border rounded-full w-6 border-black mx-auto text-center text-red-500" : "text-center")}>{hole_9}</div>;
    },
  },
];
