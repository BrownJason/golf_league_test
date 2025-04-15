import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export async function GET(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  try {
    // Await the params
  const { player_id } = await context.params;

    const player = await sql`
      SELECT 
        player_id,
        player_name,
        handicap 
      FROM players 
      WHERE player_id = ${player_id}
    `;

    if (!player || player.length === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(player[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  try {
    // Await the params
    const { player_id } = await context.params;
    const { player_name, handicap } = await request.json();
    
    const result = await sql`
      UPDATE players 
      SET player_name = ${player_name}, handicap = ${handicap}
      WHERE player_id = ${player_id}
      RETURNING player_id, player_name, handicap
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update player' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  try {
    // Await the params
  const { player_id } = await context.params;
    const result = await sql`
      DELETE FROM players 
      WHERE player_id = ${player_id}
      RETURNING player_id
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete player' },
      { status: 500 }
    );
  }
} 