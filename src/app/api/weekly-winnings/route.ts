import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = await sql`
      SELECT ws.id, p.player_id, p.player_name, ws.skins, 
      ws.greens, ws.partners, ws.best_ball, ws.low_score, ws.week_date 
      FROM weekly_winnings ws
      JOIN players p ON p.player_id = ws.player_id
      ORDER BY ws.week_date desc, p.player_id asc
    `;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array instead of error
  }
} 