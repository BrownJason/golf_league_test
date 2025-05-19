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

export default function AdminScores() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    player_id: '',
    week_date: new Date().toISOString().split('T')[0], // Today's date
    side: 'front',
    hole_1: '',
    hole_1_win: false,
    hole_2: '',
    hole_2_win: false,
    hole_3: '',
    hole_3_win: false,
    hole_4: '',
    hole_4_win: false,
    hole_5: '',
    hole_5_win: false,
    hole_6: '',
    hole_6_win: false,
    hole_7: '',
    hole_7_win: false,
    hole_8: '',
    hole_8_win: false,
    hole_9: '',
    hole_9_win: false,
  });
  const router = useRouter();

  const player_id = formData.player_id;
  const week_date = formData.week_date;

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
    if (player_id) {

    }

    if (player_id !== '') {
      const fetchPlayerSkins = async () => {
        try {
          const week = encodeURIComponent(week_date);
          const response = await fetch(`/api/players/${player_id}/skins?week=${week}`);
          if (!response.ok) throw new Error('Failed to fetch players');
          const data = await response.json();
          console.log(data)
          if (data.length > 0) {
              setFormData({
              player_id: player_id,
              week_date: week_date,
              side: data[0].side === null || data[0].side === undefined ? 'front' : '',
              hole_1: data[0].hole_1,
              hole_1_win: data[0].hole_1_win,
              hole_2: data[0].hole_2,
              hole_2_win: data[0].hole_2_win,
              hole_3: data[0].hole_3,
              hole_3_win: data[0].hole_3_win,
              hole_4: data[0].hole_4,
              hole_4_win: data[0].hole_4_win,
              hole_5: data[0].hole_5,
              hole_5_win: data[0].hole_5_win,
              hole_6: data[0].hole_6,
              hole_6_win: data[0].hole_6_win,
              hole_7: data[0].hole_7,
              hole_7_win: data[0].hole_7_win,
              hole_8: data[0].hole_8,
              hole_8_win: data[0].hole_8_win,
              hole_9: data[0].hole_9,
              hole_9_win: data[0].hole_9_win,
            });
            setDisabled(false);
          }
        } catch (error) {
          console.error('Error fetching players:', error);
        } 
      }

      fetchPlayerSkins()
    }
  }, [player_id, week_date]);

  const editInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Calculate total score
      const response = await fetch(`/api/skins/${player_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) throw new Error('Failed to add score');

      // Reset form
      setFormData({
        ...formData,
        player_id: '',
        side: 'front',
        hole_1: '',
        hole_1_win: false,
        hole_2: '',
        hole_2_win: false,
        hole_3: '',
        hole_3_win: false,
        hole_4: '',
        hole_4_win: false,
        hole_5: '',
        hole_5_win: false,
        hole_6: '',
        hole_6_win: false,
        hole_7: '',
        hole_7_win: false,
        hole_8: '',
        hole_8_win: false,
        hole_9: '',
        hole_9_win: false,
      });

      router.refresh();
      setDisabled(true);
    } catch (error) {
      console.error('Error adding score:', error);
      alert('Failed to add score. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#9A9540]">Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Calculate total score
      const response = await fetch('/api/skins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) throw new Error('Failed to add score');

      // Reset form
      setFormData({
        ...formData,
        player_id: '',
        side: 'front',
        hole_1: '',
        hole_1_win: false,
        hole_2: '',
        hole_2_win: false,
        hole_3: '',
        hole_3_win: false,
        hole_4: '',
        hole_4_win: false,
        hole_5: '',
        hole_5_win: false,
        hole_6: '',
        hole_6_win: false,
        hole_7: '',
        hole_7_win: false,
        hole_8: '',
        hole_8_win: false,
        hole_9: '',
        hole_9_win: false,
      });

      router.refresh();
    } catch (error) {
      console.error('Error adding score:', error);
      alert('Failed to add score. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#9A9540]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#9A9540] mb-2">Add Skins Score</h1>
          <div className="h-1 w-24 md:w-32 bg-[#9A9540] mx-auto rounded-full mb-4"></div>
          <p className="text-[#9A9540]/80 text-sm md:text-base">
            Enter new skins for the week
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
                    min="0"
                    step="0.01"
                    value={formData[`hole_${hole}` as keyof typeof formData] ? Number(formData[`hole_${hole}` as keyof typeof formData]) : 0}
                    onChange={(e) => setFormData({ ...formData, [`hole_${hole}`]: parseFloat(e.target.value) })}
                    className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                  />
                  <label className="block text-[#9A9540] text-xs mb-1">
                    Hole {hole} Won
                  </label>
                  <Input
                    type="checkbox"
                    checked={formData[`hole_${hole}_win` as keyof typeof formData] ? true : false}
                    onChange={(e) => setFormData({ ...formData, [`hole_${hole}_win`]: e.target.checked})}
                    className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530] mb-4"
          >
            Add Skins
          </Button>

          {/* Edit Button */}
          <Button 
            type="button"
            onClick={editInfo}
            value="edit"
            disabled={disabled}
            className="w-full bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530]"
          >
            Edit Skins
          </Button>
        </form>
      </div>
    </div>
  );
} 