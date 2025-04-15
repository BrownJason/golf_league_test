import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export async function GET() {
  try {
    const data = await sql`
      SELECT ws.id, p.player_id, p.player_name, ws.score, 
      ws."handicap", ws.adjusted_score, ws.hole_1,
      ws.hole_2, ws.hole_3, ws.hole_4, ws.hole_5, ws.hole_6, ws.hole_7, ws.hole_8,
      ws.hole_9, ws.week_date, ws.side 
      FROM weekly_score ws, players p
      WHERE p.player_id = ws.player_id
      ORDER BY ws.week_date desc, p.player_id asc
    `;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch weekly scores' }, { status: 500 });
  }
} 