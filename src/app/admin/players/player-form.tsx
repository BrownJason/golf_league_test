/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Player } from "./columns";

interface PlayerFormProps {
  onSubmit: (data: Player) => void;
  initialData?: Player;
}

export function PlayerForm({ onSubmit, initialData }: PlayerFormProps) {
  const [formData, setFormData] = useState({
    player_name: initialData?.player_name || '',
    handicap: initialData?.handicap || 0,
    avg: initialData?.avg || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      let response = null;

      if (initialData) {
        response = await fetch(`/api/players/${initialData.player_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
      } else {
        response = await fetch('/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save player');
      }

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error('Error saving player:', error);
      alert('Failed to save player. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="player_name" className="block text-[#EDE6D6] mb-2">
          Player Name
        </label>
        <Input
          id="player_name"
          value={formData.player_name}
          onChange={(e) => setFormData({ ...formData, player_name: e.target.value })}
          className="bg-[#2A4E3A] text-[#EDE6D6] border-[#9A9540]"
          required
        />
      </div>
      <div>
        <label htmlFor="handicap" className="block text-[#EDE6D6] mb-2">
          Handicap
        </label>
        <Input
          id="handicap"
          type="number"
          value={formData.handicap}
          onChange={(e) => setFormData({ ...formData, handicap: Number(e.target.value) })}
          className="bg-[#2A4E3A] text-[#EDE6D6] border-[#9A9540]"
          required
        />
      </div>
      <div>
        <label htmlFor="avg" className="block text-[#EDE6D6] mb-2">
          Average
        </label>
        <Input
          id="avg"
          type="number"
          value={formData.avg}
          onChange={(e) => setFormData({ ...formData, avg: Number(e.target.value) })}
          className="bg-[#2A4E3A] text-[#EDE6D6] border-[#9A9540]"
          required
        />
      </div>
      <Button 
        type="submit"
        className="bg-[#9A9540] text-[#FFFFFF ] hover:bg-[#7A7530] w-full"
      >
        {initialData ? 'Update Player' : 'Add Player'}
      </Button>
    </form>
  );
} 