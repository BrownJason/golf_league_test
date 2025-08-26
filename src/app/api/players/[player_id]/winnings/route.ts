/* eslint-disable @typescript-eslint/no-unused-vars */
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
      SELECT p.player_id, 
             sum(p.skins) skins, 
             sum(p.greens) greens, 
             sum(p.partners) partners, 
             sum(p.best_ball) best_ball, 
             sum(p.low_score) low_score, 
             TO_CHAR((sum(p.skins) + sum(p.greens) + sum(p.partners) + sum(p.best_ball) + sum(p.low_score)), 'FM$999,999,999.00') total
      FROM public.weekly_winnings p
      WHERE p.player_id = ${player_id}
      AND TO_CHAR(p.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
      AND p.week_date = TO_DATE(${week}, 'MMDDYYYY')
      GROUP BY p.player_id
      ORDER BY p.player_id ASC`
    } else {
    data = await sql`
      SELECT p.player_id, 
             sum(p.skins) skins, 
             sum(p.greens) greens, 
             sum(p.partners) partners, 
             sum(p.best_ball) best_ball, 
             sum(p.low_score) low_score, 
             TO_CHAR((sum(p.skins) + sum(p.greens) + sum(p.partners) + sum(p.best_ball) + sum(p.low_score)), 'FM$999,999,999.00') total
      FROM public.weekly_winnings p
      WHERE p.player_id = ${player_id}
      AND TO_CHAR(p.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
      GROUP BY p.player_id
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
    return NextResponse.json(
      { error: 'Failed to fetch player winnings' },
      { status: 500 }
    );
  }
} 