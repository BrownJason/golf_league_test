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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player winnings' },
      { status: 500 }
    );
  }
} 