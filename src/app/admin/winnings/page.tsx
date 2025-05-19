'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { convertDateFormat } from '@/lib/utils';
import { fetchPlayerWinningsByWeek } from '@/lib/api';

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
    skins: '',
    greens: '',
    partners: '',
    best_ball: '',
    low_score: '',
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
    
    if (player_id !== '') {
      const fetchScores = async () => {
        if (player_id !== '') {
          try {
            const resp = await fetchPlayerWinningsByWeek(parseInt(player_id), convertDateFormat(week_date));
            console.log(resp)
            if (resp.length > 0){
              setFormData({
                player_id: player_id,
                week_date: week_date,
                skins: resp[0].skins.toString(),
                greens: resp[0].greens.toString(),
                partners: resp[0].partners.toString(),
                best_ball: resp[0].best_ball.toString(),
                low_score: resp[0].low_score.toString()
              })
              setDisabled(false);
            } else {
              setFormData({
                ...formData,
                skins: '',
                greens: '',
                partners: '',
                best_ball: '',
                low_score: '',
              });
              setDisabled(true);
            }
          } catch (error) {
            console.error('Error fetching players:', error);
          } 
        }
      }
  
      fetchScores()
    }
  }, [player_id, week_date]);

  const editInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/winnings/${formData.player_id}`, {
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
        skins: '',
        greens: '',
        partners: '',
        best_ball: '',
        low_score: '',
      });

      router.refresh();
      setDisabled(true);
    } catch (error) {
      console.error('Error adding score:', error);
      alert('Failed to add score. Please try again.');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/winnings', {
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
        skins: '',
        greens: '',
        partners: '',
        best_ball: '',
        low_score: '',
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#9A9540] mb-2">Add Weekly Winnings</h1>
          <div className="h-1 w-24 md:w-32 bg-[#9A9540] mx-auto rounded-full mb-4"></div>
          <p className="text-[#9A9540]/80 text-sm md:text-base">
            Enter new winnings for the week
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

          {/* Hole Scores */}
          <div className="mb-6">
            <label className="block text-[#9A9540] text-sm font-medium mb-4">
              Winnings
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {['skins', 'greens', 'partners', 'best_ball', 'low_score'].map((jackpots) => (
                <div key={jackpots}>
                  <label className="block text-[#9A9540] text-xs mb-1">
                    {jackpots}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData[`${jackpots}` as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [`${jackpots}`]: e.target.value })}
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
            className="w-full bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530] mb-4"
          >
            Add Winnings
          </Button>

          {/* Edit Button */}
          <Button 
            type="button"
            onClick={editInfo}
            value="edit"
            disabled={disabled}
            className="w-full bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530]"
          >
            Edit Winnings
          </Button>
        </form>
      </div>
    </div>
  );
} 