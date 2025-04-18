/* eslint-disable @typescript-eslint/no-unused-vars */
import { getDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: Request, context: { params: Promise<{ player_id: string }> }) {
  const sql = getDatabase();
  
  try {
    const { searchParams } = new URL(request.url);
    const player_id = searchParams.get('player_id');

    const weeks = await sql`
      SELECT DISTINCT 
        TO_CHAR(week_date, 'MMDDYYYY') as formatted_date,
        week_date
      FROM weekly_score
      WHERE player_id = ${player_id}
      ORDER BY week_date DESC
    `;

    return new NextResponse(JSON.stringify(weeks), {
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
      { error: 'Failed to fetch weeks' },
      { status: 500 }
    );
  }
} 