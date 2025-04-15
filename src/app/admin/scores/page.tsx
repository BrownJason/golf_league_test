'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

interface Player {
  player_id: number;
  player_name: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default function AdminScores() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    player_id: '',
    week_date: new Date().toISOString().split('T')[0], // Today's date
    side: 'front',
    hole_1: '',
    hole_2: '',
    hole_3: '',
    hole_4: '',
    hole_5: '',
    hole_6: '',
    hole_7: '',
    hole_8: '',
    hole_9: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) throw new Error('Failed to fetch players');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Calculate total score
      const score = Object.entries(formData)
        .filter(([key]) => key.startsWith('hole_'))
        .reduce((sum, [, value]) => sum + Number(value), 0);

      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          score,
        }),
      });

      if (!response.ok) throw new Error('Failed to add score');

      // Reset form
      setFormData({
        ...formData,
        player_id: '',
        hole_1: '',
        hole_2: '',
        hole_3: '',
        hole_4: '',
        hole_5: '',
        hole_6: '',
        hole_7: '',
        hole_8: '',
        hole_9: '',
      });

      alert('Score added successfully!');
      router.refresh();
    } catch (error) {
      console.error('Error adding score:', error);
      alert('Failed to add score. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A3E2A]">
        <div className="text-[#9A9540]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#9A9540] mb-2">Add Weekly Score</h1>
          <div className="h-1 w-24 md:w-32 bg-[#9A9540] mx-auto rounded-full mb-4"></div>
          <p className="text-[#9A9540]/80 text-sm md:text-base">
            Enter new scores for the week
          </p>
        </div>

        {/* Score Entry Form */}
        <form onSubmit={handleSubmit} className="bg-[#243E2A] rounded-xl border border-[#9A9540] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Player Selection */}
            <div>
              <label className="block text-[#9A9540] text-sm font-medium mb-2">
                Player
              </label>
              <Select
                value={formData.player_id}
                onValueChange={(value) => setFormData({ ...formData, player_id: value })}
              >
                <SelectTrigger className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]">
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A3E2A] border-[#9A9540]">
                  {players.map((player) => (
                    <SelectItem 
                      key={player.player_id} 
                      value={player.player_id.toString()}
                      className="text-[#9A9540]"
                    >
                      {player.player_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[#9A9540] text-sm font-medium mb-2">
                Date
              </label>
              <Input
                type="date"
                value={formData.week_date}
                onChange={(e) => setFormData({ ...formData, week_date: e.target.value })}
                className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                required
              />
            </div>
          </div>

          {/* Side Selection */}
          <div className="mb-6">
            <label className="block text-[#9A9540] text-sm font-medium mb-2">
              Side
            </label>
            <Select
              value={formData.side}
              onValueChange={(value) => setFormData({ ...formData, side: value })}
            >
              <SelectTrigger className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]">
                <SelectValue placeholder="Select side" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A3E2A] border-[#9A9540]">
                <SelectItem value="front" className="text-[#9A9540]">Front Nine</SelectItem>
                <SelectItem value="back" className="text-[#9A9540]">Back Nine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hole Scores */}
          <div className="mb-6">
            <label className="block text-[#9A9540] text-sm font-medium mb-4">
              Hole Scores
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((hole) => (
                <div key={hole}>
                  <label className="block text-[#9A9540] text-xs mb-1">
                    Hole {hole}
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={formData[`hole_${hole}` as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [`hole_${hole}`]: e.target.value })}
                    className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530]"
          >
            Add Score
          </Button>
        </form>
      </div>
    </div>
  );
} 