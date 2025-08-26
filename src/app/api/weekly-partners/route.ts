/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'verify-full' });

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const week_date = searchParams.get('week_date');
    let results;
    if (week_date) {
      results = await sql`
        SELECT ps.*, p1.player_name as player1_name, p2.player_name as player2_name
        FROM partners ps
        JOIN players p1 ON ps.player1_id = p1.player_id
        JOIN players p2 ON ps.player2_id = p2.player_id
        WHERE ps.week_date = ${week_date}
        ORDER BY ps.combined_score ASC
      `;
    } else {
      results = await sql`
        SELECT ps.*, p1.player_name as player1_name, p2.player_name as player2_name
        FROM partners ps
        JOIN players p1 ON ps.player1_id = p1.player_id
        JOIN players p2 ON ps.player2_id = p2.player_id
        ORDER BY ps.week_date DESC, ps.combined_score ASC
      `;
    }
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch partner scores' },
      { status: 500 }
    );
  }
}
