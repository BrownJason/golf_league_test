import { Player } from '@/app/admin/players/columns';
import { WeeklyScore } from '@/app/weekly_score/score-columns';
import { WeeklyWinnings } from '@/app/weekly_score/winnings-columns';

export async function fetchPlayers(): Promise<Player[]> {
  try {
    const response = await fetch('/api/players', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Failed to fetch players: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchWeeklyScores(): Promise<WeeklyScore[]> {
  try {
    const response = await fetch('/api/weekly-scores', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weekly scores: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchWeeklyWinnings(): Promise<WeeklyWinnings[]> {
  const response = await fetch(`/api/weekly-winnings`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch weekly winnings');
  }
  return response.json();
}

export async function fetchPlayer(playerId: number): Promise<Player> {
  const response = await fetch(`/api/players/${playerId}`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player');
  }
  return response.json();
}

export async function fetchPlayerScores(playerId: number): Promise<WeeklyScore[]> {
  const response = await fetch(`/api/players/${playerId}/scores`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores');
  }
  return response.json();
}

export async function fetchPlayerScoresByWeek(playerId: number, weekDate: string): Promise<WeeklyScore[]> {
  const response = await fetch(`/api/players/${playerId}/scores?week=${weekDate}`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores for week');
  }
  return response.json();
} 