import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const sql = getDatabase();
  
  try {
    console.log('Fetching players...');
    
    const players = await sql`
      SELECT 
        player_id,
        player_name,
        handicap,
        avg,
        (select distinct count(week_date) from weekly_score ws
          where ws.player_id = players.player_id
          and TO_CHAR(week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')) weeks_played
      FROM players 
      ORDER BY player_name ASC
    `;

    console.log(`Successfully fetched ${players.length} players`);
    
    return new NextResponse(JSON.stringify(players), {
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
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch players' }), 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDatabase();
    const { player_name, handicap, avg } = await request.json();
    
    const result = await sql`
      INSERT INTO players (player_name, handicap, avg)
      VALUES (${player_name}, ${handicap}, ${avg})
      RETURNING player_id, player_name, handicap
    `;
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
} 