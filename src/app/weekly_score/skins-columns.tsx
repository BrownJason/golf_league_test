"use client";

import { ColumnDef } from "@tanstack/react-table";

export type WeeklySkins = {
  player_name: string;
  week_date: string | Date;
  side: string;
  hole: number;
  winnings: number;
  win: boolean;
};

export const skinsColumns: ColumnDef<WeeklySkins>[] = [
  {
    accessorKey: "player_name",
    header: () => <div className="text-center">Player</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("player_name")}</div>,
  },
  {
    accessorKey: "week_date",
    header: () => <div className="text-center">Week</div>,
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
    accessorKey: "side",
    header: () => <div className="text-center">Side</div>,
    cell: ({ row }) => {
      const side: string = row.getValue("side");
      return <div className="text-center">{side.replaceAll(side.charAt(0), side.charAt(0).toUpperCase())}</div>;
    }
  },
  {
    accessorKey: "hole",
    header: () => <div className="text-center">Hole</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("hole")}</div>,
  },
  {
    accessorKey: "winnings",
    header: () => <div className="text-center">Winnings</div>,
    cell: ({ row }) => {
      const winnings = row.getValue("winnings");
      return (
        <div className="text-center">
          {Number(winnings).toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </div>
      );
    },
  }, 
  {
    accessorKey: "win",
    header: () => <div className="text-center">Win</div>,
    cell: ({ row }) => {
      const win = row.getValue("win");
      return <div className="text-center"> {win ? "🏆" : ""}</div>;
    },
  }
];
