/* eslint-disable @typescript-eslint/no-unused-vars */
import { getDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  const sql = getDatabase();

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
        AND ws.week_date = TO_DATE(${week}, 'MMDDYYYY')
        AND TO_CHAR(ws.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
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
        AND TO_CHAR(ws.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
        ORDER BY ws.week_date DESC
      `;
    }

    if (!query || query.length === 0) {
      return NextResponse.json([]);  // Return empty array if no scores found
    }

    return new NextResponse(JSON.stringify(query), {
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
    return NextResponse.json(
      { error: 'Failed to fetch player scores' },
      { status: 500 }
    );
  }
} 