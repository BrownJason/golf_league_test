import { Player } from '@/app/admin/players/columns';
import { WeeklyScore } from '@/app/weekly_score/score-columns';
import { WeeklyWinnings } from '@/app/weekly_score/winnings-columns';
import { getBaseUrl } from './utils';

export async function fetchPlayers(): Promise<Player[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/players`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }
  return response.json();
}

export async function fetchWeeklyScores(): Promise<WeeklyScore[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/weekly-scores`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch weekly scores');
  }
  return response.json();
}

export async function fetchWeeklyWinnings(): Promise<WeeklyWinnings[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/weekly-winnings`, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch weekly winnings');
  }
  return response.json();
}

export async function fetchPlayer(playerId: number): Promise<Player> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/players/${playerId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch player');
  }
  return response.json();
}

export async function fetchPlayerScores(playerId: number): Promise<WeeklyScore[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/players/${playerId}/scores`);
  if (!response.ok) {
    throw new Error('Failed to fetch player scores');
  }
  return response.json();
}

export async function fetchPlayerScoresByWeek(playerId: number, weekDate: string): Promise<WeeklyScore[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/players/${playerId}/scores?week=${weekDate}`);
  if (!response.ok) {
    throw new Error('Failed to fetch player scores for week');
  }
  return response.json();
} 