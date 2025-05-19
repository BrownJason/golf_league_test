import { getDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  const sql = getDatabase();

  try {
    // Await the params
    const { player_id } = await context.params;
    const { searchParams } = new URL(request.url);
    const week = searchParams.get('week');  
    let data;
    if (week) {
      data = await sql`
      SELECT 
        player_id,
        week_date,
        side,
        hole_1,
        hole_1_win,
        hole_2,
        hole_2_win,
        hole_3,
        hole_3_win,
        hole_4,
        hole_4_win,
        hole_5,
        hole_5_win,
        hole_6,
        hole_6_win,
        hole_7,
        hole_7_win,
        hole_8,
        hole_8_win,
        hole_9,
        hole_9_win
      FROM public.skins_score p
      WHERE p.player_id = ${player_id}
      AND TO_CHAR(p.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
      AND p.week_date = ${week}
      ORDER BY p.player_id ASC`
    } else {
    data = await sql`
      SELECT 
        player_id,
        week_date,
        side,
        hole_1,
        hole_1_win,
        hole_2,
        hole_2_win,
        hole_3,
        hole_3_win,
        hole_4,
        hole_4_win,
        hole_5,
        hole_5_win,
        hole_6,
        hole_6_win,
        hole_7,
        hole_7_win,
        hole_8,
        hole_8_win,
        hole_9,
        hole_9_win
      FROM public.skins_score p
      WHERE p.player_id = ${player_id}
      AND TO_CHAR(p.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
      ORDER BY p.player_id ASC
    `;
    }

    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player winnings' },
      { status: 500 }
    );
  }
} 