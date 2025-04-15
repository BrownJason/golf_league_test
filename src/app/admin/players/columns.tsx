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

export type Player = {
  id: number;
  player_id: number;
  player_name: string;
  handicap: number;
};

export const playerColumns: ColumnDef<Player>[] = [
  {
    accessorKey: "player_name",
    header: "Player Name",
  },
  {
    accessorKey: "handicap",
    header: "Handicap",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const player = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4 text-[#9A9540]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1A3E2A] border-[#9A9540]">
            <DropdownMenuItem
              className="text-[#9A9540] hover:bg-[#2A4E3A] cursor-pointer"
              onClick={() => handleEditPlayer(player)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 hover:bg-[#2A4E3A] cursor-pointer"
              onClick={() => handleDeletePlayer(player.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

async function handleEditPlayer(_player: Player) {
  // Implementation will be added
}

async function handleDeletePlayer(playerId: number) {
  if (confirm('Are you sure you want to delete this player? This action cannot be undone.')) {
    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'DELETE',
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