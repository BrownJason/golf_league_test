import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { 
  ssl: "verify-full"
});

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET() {
  try {
    
    const data = await sql`
      SELECT 
        ws.id, 
        p.player_id, 
        p.player_name, 
        ws.hole_1,
        ws.hole_1_win,
        ws.hole_2,
        ws.hole_2_win,
        ws.hole_3, 
        ws.hole_3_win,
        ws.hole_4, 
        ws.hole_4_win,
        ws.hole_5, 
        ws.hole_5_win,
        ws.hole_6, 
        ws.hole_6_win,
        ws.hole_7, 
        ws.hole_7_win,
        ws.hole_8,
        ws.hole_8_win,
        ws.hole_9, 
        ws.hole_9_win,
        ws.week_date, 
        ws.side 
      FROM skins_score ws
      JOIN players p ON p.player_id = ws.player_id
      WHERE TO_CHAR(ws.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
      ORDER BY ws.week_date DESC, p.player_id ASC
    `;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array instead of error
  }
} 