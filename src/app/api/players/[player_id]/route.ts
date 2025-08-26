/* eslint-disable @typescript-eslint/no-unused-vars */
import { getDatabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';


export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  const sql = getDatabase();

  try {
    // Await the params
  const { player_id } = await context.params;

    const player = await sql`
      SELECT 
        player_id,
        player_name,
        handicap,
        avg
      FROM players 
      WHERE player_id = ${player_id}
    `;

    if (!player || player.length === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(player[0]), {
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
      { error: 'Failed to fetch player' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  const sql = getDatabase();

  try {
    const session = await getServerSession(authOptions) as { user?: { isAdmin?: boolean } } | null;
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    // Await the params
    const { player_id } = await context.params;
    const { player_name, handicap, avg } = await request.json();
    
    const result = await sql`
      UPDATE players 
      SET player_name = ${player_name}, handicap = ${handicap}, avg = ${avg}
      WHERE player_id = ${player_id}
      RETURNING player_id, player_name, handicap
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }
    
    return new NextResponse(JSON.stringify(result[0]), {
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
      { error: 'Failed to update player' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ player_id: string }> }
) {
  const sql = getDatabase();
  
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
    return NextResponse.json(
      { error: 'Failed to delete player' },
      { status: 500 }
    );
  }
} 