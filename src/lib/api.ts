/* eslint-disable @typescript-eslint/no-explicit-any */
import { Player } from '@/app/admin/players/columns';
import { WeeklyScore } from '@/app/weekly_score/score-columns';
import { WeeklyWinnings } from '@/app/weekly_score/winnings-columns';
import client from './redis';

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
    const cachedData = await client.get('players');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 0 },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch players: ${response.statusText}`);
    }

    const data = await response.json();
    await client.set('players', JSON.stringify(data), { EX: 300 });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchWeeklyScores(): Promise<WeeklyScore[]> {
  try {
    const url = getApiUrl('/api/weekly-scores');
    const cachedData = await client.get('weekly-scores');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 0 },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weekly scores: ${response.statusText}`);
    }

    const data = await response.json();
    await client.set('weekly-scores', JSON.stringify(data), { EX: 300 });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchWeeklyWinnings(): Promise<WeeklyWinnings[]> {
  const url = getApiUrl('/api/weekly-winnings');
  const cachedData = await client.get('weekly-winnings');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch weekly winnings');
  }
  const data = await response.json();
  await client.set('weekly-winnings', JSON.stringify(data), { EX: 300 } );
  return Array.isArray(data) ? data : [];
}

export async function fetchPlayer(playerId: number): Promise<Player> {
  const url = getApiUrl(`/api/players/${playerId}`);
  const cachedData = await client.get(`player-${playerId}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url, {
    next: { revalidate: 0 },
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player');
  }
  const data = await response.json();
  await client.set(`player-${playerId}`, JSON.stringify(data), { EX: 300 });
  return data;
}

export async function fetchPlayerScores(playerId: number): Promise<WeeklyScore[]> {
  const url = getApiUrl(`/api/players/${playerId}/scores`);
  const cachedData = await client.get(`player-scores-${playerId}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url, {
    next: { revalidate: 0 },
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores');
  }
  const data = await response.json();
  await client.set(`player-scores-${playerId}`, JSON.stringify(data), { EX: 300 });
  return data;
}

export async function fetchPlayerScoresByWeek(playerId: number, weekDate: string): Promise<WeeklyScore[]> {
  const week = encodeURIComponent(weekDate);
  const url = getApiUrl(`/api/players/${playerId}/scores?week=${week}`);

  const cachedData = await client.get(`player-scores-${playerId}-${week}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url, {
    next: { revalidate: 0 },
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores for week');
  }
  const data = await response.json();
  await client.set(`player-scores-${playerId}-${week}`, JSON.stringify(data), { EX: 300 });
  return data;
} 

export async function fetchSeasonOverviewData(): Promise<any>{

  const url = getApiUrl(`/api/season`);
  const cachedData = await client.get('season');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch season data');
  }
  const data = await response.json();
  await client.set('season', JSON.stringify(data), { EX: 300 });
  return data;
}

export async function fetchESPNGolfScores(): Promise<any> {
  
  const url = 'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard';
  const cachedData = await client.get('espn-golf-scores');
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch espn golf data');
  }
  const data = await response.json();
  await client.set('espn-golf-scores', JSON.stringify(data), { EX: 300 });
  return data;
}

export async function fetchPlayerWinnings(playerId: number): Promise<any> {
  const url = getApiUrl(`/api/players/${playerId}/winnings`);
  const cachedData = await client.get(`player-winnings-${playerId}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch player winnings');
  }
  const data = await response.json();
  await client.set(`player-winnings-${playerId}`, JSON.stringify(data), { EX: 300 });
  return data;
}

export async function fetchWeeksByPlayer(playerId: number): Promise<any> {
  const url = getApiUrl(`/api/weeks?player_id=${playerId}`);
  const response = await fetch(url, {
    next: {revalidate: 0},
    cache: 'no-store'
  });

  if(!response.ok) {
    throw new Error('Failed to fetch weeks');
  }
  const data = await response.json();
  return data;
}