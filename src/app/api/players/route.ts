import { NextResponse } from 'next/server';
import postgres from 'postgres';

// Create a new connection for each request
const sql = postgres(process.env.DATABASE_URL!, { 
  ssl: "verify-full",
  max: 1, // Reduce connection pool size
  idle_timeout: 20, // Reduce idle timeout
  connect_timeout: 10, // Add connection timeout
});

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = false;

export async function GET() {
  try {
    console.log('Attempting to fetch players...');
    
    const players = await sql`
      SELECT 
        player_id,
        player_name,
        handicap 
      FROM players 
      ORDER BY player_name ASC
    `;

    console.log(`Successfully fetched ${players.length} players`);
    
    return NextResponse.json(players, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });
  } catch (error) {
    console.error('Database Error:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch players', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    // Ensure connection is properly ended
    await sql.end();
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