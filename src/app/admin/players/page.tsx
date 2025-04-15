'use client';

import { useState, useEffect } from 'react';
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Player, playerColumns } from "./columns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlayerForm } from './player-form';

export default function ManagePlayers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const response = await fetch('/api/players', {
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayersData();
  }, []);

  const handleAddPlayer = async (newPlayer: Player) => {
    setIsAddDialogOpen(false);
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A3E2A]">
        <div className="text-[#9A9540]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#1A3E2A] rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#9A9540]">Manage Players</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530]">
              Add New Player
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1A3E2A] border-[#9A9540]">
            <DialogHeader>
              <DialogTitle className="text-[#9A9540]">Add New Player</DialogTitle>
            </DialogHeader>
            <PlayerForm onSubmit={handleAddPlayer} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable 
        columns={playerColumns} 
        data={players} 
        header="Players List" 
        filterItem="player_name"
      />
    </div>
  );
} 