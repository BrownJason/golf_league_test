/* eslint-disable @typescript-eslint/no-explicit-any */
import { Player } from '@/app/admin/players/columns';
import { WeeklyScore } from '@/app/weekly_score/score-columns';
import { WeeklyWinnings } from '@/app/weekly_score/winnings-columns';

function getApiUrl(path: string): string {
  // For client-side requests
  if (typeof window !== 'undefined') {
    return path;
  }

  // For server-side requests
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return `${baseUrl}${path}`;
}

export async function fetchPlayers(): Promise<Player[]> {
  try {
    const url = getApiUrl('/api/players');
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 0 },
      cache: 'no-store'
    });

    if (!response.ok) {
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
    const url = getApiUrl('/api/weekly-scores');
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 0 },
      cache: 'no-store'
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
  const url = getApiUrl('/api/weekly-winnings');
  const response = await fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch weekly winnings');
  }
  return response.json();
}

export async function fetchPlayer(playerId: number): Promise<Player> {
  const url = getApiUrl(`/api/players/${playerId}`);
  const response = await fetch(url, {
    next: { revalidate: 0 },
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player');
  }
  return response.json();
}

export async function fetchPlayerScores(playerId: number): Promise<WeeklyScore[]> {
  const url = getApiUrl(`/api/players/${playerId}/scores`);
  const response = await fetch(url, {
    next: { revalidate: 0 },
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores');
  }
  return response.json();
}

export async function fetchPlayerScoresByWeek(playerId: number, weekDate: string): Promise<WeeklyScore[]> {
  const url = getApiUrl(`/api/players/${playerId}/scores?week=${weekDate}`);
  const response = await fetch(url, {
    next: { revalidate: 0 },
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores for week');
  }
  return response.json();
} 

export async function fetchSeasonOverviewData(): Promise<any>{

  const url = getApiUrl(`/api/season`);
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch season data');
  }
  return response.json();
}

export async function fetchESPNGolfScores(): Promise<any> {
  
  const url = 'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard';
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch espn golf data');
  }
  return response.json();
}

export async function fetchPlayerWinnings(playerId: number): Promise<any> {
  const url = getApiUrl(`/api/players/${playerId}/winnings`);
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch player winnings');
  }
  return response.json();

}

export async function fetchWeeks(): Promise<any> {
  const url = getApiUrl(`/api/weeks`);
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch weeks');
  }
  return response.json();

}