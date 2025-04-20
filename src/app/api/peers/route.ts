import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const sql = getDatabase();

  try {
    const peers = await sql`
      SELECT p.player_name, DIV(SUM(ws.score), COUNT(ws.score)) average_score
        FROM players p, weekly_score ws
        WHERE p.player_id = ws.player_id
        GROUP by p.player_name
        ORDER BY average_score DESC
    `;

    return NextResponse.json(peers);
  } catch (error) {
    console.error('Error fetching peers:', error);
    return NextResponse.json({ error: 'Failed to fetch peers' }, { status: 500 });
  }
}   