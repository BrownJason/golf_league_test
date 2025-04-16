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
    
    const data = await sql`
      SELECT p.player_id, 
             sum(p.skins) skins, 
             sum(p.greens) greens, 
             sum(p.partners) partners, 
             sum(p.best_ball) best_ball, 
             sum(p.low_score) low_score, 
             TO_CHAR((sum(p.skins) + sum(p.greens) + sum(p.partners) + sum(p.best_ball) + sum(p.low_score)), 'FM$999,999,999.00') total
      FROM public.weekly_winnings p
      WHERE p.player_id = ${player_id}
      GROUP BY p.player_id
      ORDER BY p.player_id ASC
    `;

    if (!data || data.length === 0) {
      return NextResponse.json([{
        player_id: parseInt(player_id),
        skins: 0,
        greens: 0,
        partners: 0,
        best_ball: 0,
        low_score: 0,
        total: '$0.00'
      }]);
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