import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = false;

export async function GET() {
  try {
    const players = await sql`
      SELECT 
        id,
        player_id,
        player_name,
        handicap 
      FROM players 
      ORDER BY player_name ASC
    `;
    return NextResponse.json(players);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { player_name, handicap } = await request.json();
    
    const result = await sql`
      INSERT INTO players (player_name, handicap)
      VALUES (${player_name}, ${handicap})
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