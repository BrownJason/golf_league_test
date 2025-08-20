/* eslint-disable @typescript-eslint/no-explicit-any */
import { Player } from '@/app/admin/players/columns';
import { WeeklyScore } from '@/app/weekly_score/score-columns';
import { WeeklySkins } from '@/app/weekly_score/skins-columns';
import { WeeklyWinnings } from '@/app/weekly_score/winnings-columns';

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

function setCachedData(key: string, data: any, ttlMs: number = 300000) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMs
  });
}

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
    const cacheKey = 'players';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const url = getApiUrl('/api/players');
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch players: ${response.statusText}`);
    }

    const data = await response.json();
    const result = Array.isArray(data) ? data : [];
    setCachedData(cacheKey, result, 300000); // Cache for 5 minutes
    return result;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchWeeklyScores(): Promise<WeeklyScore[]> {
  try {
    const cacheKey = 'weekly-scores';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const url = getApiUrl('/api/weekly-scores');
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weekly scores: ${response.statusText}`);
    }

    const data = await response.json();
    const result = Array.isArray(data) ? data : [];
    setCachedData(cacheKey, result, 60000); // Cache for 1 minute
    return result;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchWeeklySkins(): Promise<WeeklySkins[]> {
  try {
    const cacheKey = 'weekly-skins';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const url = getApiUrl('/api/weekly-skins');
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weekly skins: ${response.statusText}`);
    }

    const data = await response.json();
    const result = Array.isArray(data) ? data : [];
    setCachedData(cacheKey, result, 60000);
    return result;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

export async function fetchWeeklyWinnings(): Promise<WeeklyWinnings[]> {
  const cacheKey = 'weekly-winnings';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = getApiUrl('/api/weekly-winnings');
  const response = await fetch(url, {
    next: { revalidate: 60 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch weekly winnings');
  }
  const data = await response.json();
  const result = Array.isArray(data) ? data : [];
  setCachedData(cacheKey, result, 60000);
  return result;
}

export async function fetchPlayer(playerId: number): Promise<Player> {
  const cacheKey = `player-${playerId}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = getApiUrl(`/api/players/${playerId}`);
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player');
  }
  const data = await response.json();
  setCachedData(cacheKey, data, 300000);
  return data;
}

export async function fetchPlayerScores(playerId: number): Promise<WeeklyScore[]> {
  const url = getApiUrl(`/api/players/${playerId}/scores`);
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores');
  }
  const data = await response.json();
  return data;
}

export async function fetchPlayerScoresByWeek(playerId: number, weekDate: string): Promise<WeeklyScore[]> {
  const week = encodeURIComponent(weekDate);
  const url = getApiUrl(`/api/players/${playerId}/scores?week=${week}`);
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch player scores for week');
  }
  const data = await response.json();
  return data;
} 

export async function fetchSeasonOverviewData(): Promise<any>{
  const cacheKey = 'season-overview';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = getApiUrl(`/api/season`);
  const response = await fetch(url, {
    next: {revalidate: 300},
  });

  if(!response.ok) {
    throw new Error('Failed to fetch season data');
  }
  const data = await response.json();
  setCachedData(cacheKey, data, 300000);
  return data;
}

export async function fetchWeeklyGlance(): Promise<any>{
  const cacheKey = 'weekly-glance';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = getApiUrl(`/api/weekly-glance`);
  const response = await fetch(url, {
    next: {revalidate: 60},
  });

  if(!response.ok) {
    throw new Error('Failed to fetch season data');
  }
  const data = await response.json();
  setCachedData(cacheKey, data, 60000);
  return data;
}

export async function fetchESPNGolfScores(): Promise<any> {
  const cacheKey = 'espn-golf-scores';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  const url = 'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard';
  const response = await fetch(url, {
    next: {revalidate: 1800}, // Cache for 30 minutes
  });

  if(!response.ok) {
    throw new Error('Failed to fetch espn golf data');
  }
  const data = await response.json();
  setCachedData(cacheKey, data, 1800000); // 30 minutes
  return data;
}

export async function fetchPlayerWinnings(playerId: number): Promise<any> {
  const url = getApiUrl(`/api/players/${playerId}/winnings`);
  const response = await fetch(url, {
    next: {revalidate: 300},
  });

  if(!response.ok) {
    throw new Error('Failed to fetch player winnings');
  }
  const data = await response.json();
  return data;
}

export async function fetchPlayerWinningsByWeek(playerId: number, weekDate: string): Promise<any> {
  const week = encodeURIComponent(weekDate);
  const url = getApiUrl(`/api/players/${playerId}/winnings?week=${week}`);
  const response = await fetch(url, {
    next: {revalidate: 300},
  });

  if(!response.ok) {
    throw new Error('Failed to fetch player winnings');
  }
  const data = await response.json();
  return data;
}

export async function fetchWeeksByPlayer(playerId: number): Promise<any> {
  const url = getApiUrl(`/api/weeks?player_id=${playerId}`);
  const response = await fetch(url, {
    next: {revalidate: 300},
  });

  if(!response.ok) {
    throw new Error('Failed to fetch weeks');
  }
  const data = await response.json();
  return data;
}

export async function fetchScorecard(): Promise<any> {
  const url = getApiUrl('/api/scorecard');
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if(!response.ok) {
    throw new Error('Failed to fetch scorecard');
  }
  const data = await response.json();
  return data;
}

export async function fetchPeers(): Promise<any> {
  const url = getApiUrl('/api/peers');
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if(!response.ok) {
    throw new Error('Failed to fetch peers');
  }
  const data = await response.json();
  return data;
}

export async function fetchWeeklyPartners(week_date?: string) {
  try {
    let url = getApiUrl('/api/weekly-partners');
    if (week_date) {
      url += `?week_date=${week_date}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch partner scores: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}