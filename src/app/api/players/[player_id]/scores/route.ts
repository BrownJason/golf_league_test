import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export async function GET(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  try {
    const { player_id } = await context.params;
    const { searchParams } = new URL(request.url);
    const week = searchParams.get('week');

    let query;
    if (week) {
      // If week parameter is provided, fetch scores for that specific week
      query = await sql`
        SELECT ws.id, p.player_id, p.player_name, ws.score, 
          ws.handicap, ws.adjusted_score, ws.hole_1,
          ws.hole_2, ws.hole_3, ws.hole_4, ws.hole_5, ws.hole_6, ws.hole_7, ws.hole_8,
          ws.hole_9, ws.week_date, ws.side 
        FROM weekly_score ws
        JOIN players p ON p.player_id = ws.player_id
        WHERE p.player_id = ${player_id}
        AND ws.week_date = TO_DATE(${week}, 'MM/DD/YYYY')
        ORDER BY ws.week_date DESC
      `;
    } else {
      // If no week parameter, fetch all scores
      query = await sql`
        SELECT ws.id, p.player_id, p.player_name, ws.score, 
          ws.handicap, ws.adjusted_score, ws.hole_1,
          ws.hole_2, ws.hole_3, ws.hole_4, ws.hole_5, ws.hole_6, ws.hole_7, ws.hole_8,
          ws.hole_9, ws.week_date, ws.side 
        FROM weekly_score ws
        JOIN players p ON p.player_id = ws.player_id
        WHERE p.player_id = ${player_id}
        ORDER BY ws.week_date DESC
      `;
    }

    if (!query || query.length === 0) {
      return NextResponse.json([]);  // Return empty array if no scores found
    }

    return NextResponse.json(query);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player scores' },
      { status: 500 }
    );
  }
} 