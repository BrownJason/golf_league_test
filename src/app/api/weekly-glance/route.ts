import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET() {
  try {
    const data = await sql`
      SELECT ww.player_id, p.player_name, ww.week_date, ww.skins, ww.greens, ww.partners, ww.best_ball, ww.low_score
        FROM weekly_winnings ww
        JOIN players p ON ww.player_id = p.player_id
        WHERE ww.week_date = (SELECT MAX(week_date) FROM weekly_winnings)
        AND (ww.skins > 0 OR ww.greens > 0 OR ww.partners > 0 OR ww.best_ball > 0 OR ww.low_score > 0)
        ORDER BY ww.player_id
    `;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array instead of error
  }
} 