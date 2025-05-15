'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlayerForm } from "./player-form";

export type Player = {
  id: number;
  player_id: number;
  player_name: string;
  handicap: number;
  avg: number;
  weeks_played: number;
};

export const playerColumns: ColumnDef<Player>[] = [
  {
    accessorKey: "player_name",
    header: "Player Name",
    cell: ({row}) => {
      return <div className="text-center text-lg">{row.getValue("player_name")}</div>
    }
  },
  {
    accessorKey: "handicap",
    header: "Handicap",
    cell: ({row}) => {
      return <div className="text-center text-lg">{row.getValue("handicap")}</div>
    }
  },
  {
    accessorKey: "avg",
    header: "Average",
    cell: ({row}) => {
      return <div className="text-center text-lg">{row.getValue("avg")}</div>
    }
  },
  {
    id: "actions",
    header: "Edit/Delete",
    cell: ({ row }) => {
      const player = row.original;

      return (
        <div className="text-center">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4 text-[#EDE6D6]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1A3E2A] border-[#9A9540]">
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      className="text-[#EDE6D6] hover:bg-[#2A4E3A] cursor-pointer"
                    >
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                <DropdownMenuItem
                  className="text-red-500 hover:bg-[#2A4E3A] cursor-pointer"
                  onClick={() => handleDeletePlayer(player.player_id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="bg-[#1A3E2A] border-[#9A9540]">
              <DialogHeader>
                <DialogTitle className="text-[#EDE6D6]">Update Player</DialogTitle>
              </DialogHeader>
              <PlayerForm onSubmit={() => handleEditPlayer(player.player_name)} initialData={player} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

async function handleEditPlayer(playerName: string) {
  console.log(`${playerName} has been updated`);
  window.location.reload();
}

async function handleDeletePlayer(playerId: number) {
  if (confirm('Are you sure you want to delete this player? This action cannot be undone.')) {
    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'DELETE',
        body: JSON.stringify(playerId)
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete player');
      }
      
      // Refresh the page or update the table
      window.location.reload();
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player. Please try again.');
    }
  }
} 