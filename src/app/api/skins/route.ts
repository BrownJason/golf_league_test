import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data)

    const result = await sql`
      INSERT INTO skins_Score (
        player_id,
        week_date,
        side,
        hole_1,
        hole_1_win,
        hole_2,
        hole_2_win,
        hole_3,
        hole_3_win,
        hole_4,
        hole_4_win,
        hole_5,
        hole_5_win,
        hole_6,
        hole_6_win,
        hole_7,
        hole_7_win,
        hole_8,
        hole_8_win,
        hole_9,
        hole_9_win
      ) VALUES (
        ${data.player_id},
        ${data.week_date},
        ${data.side},
        ${data.hole_1 === '' ? 0 : data.hole_1},
        ${data.hole_1_win},
        ${data.hole_2  === '' ? 0 : data.hole_2},
        ${data.hole_2_win},
        ${data.hole_3 === '' ? 0 : data.hole_3},
        ${data.hole_3_win},
        ${data.hole_4 === '' ? 0 : data.hole_4},
        ${data.hole_4_win},
        ${data.hole_5 === '' ? 0 : data.hole_5},
        ${data.hole_5_win},
        ${data.hole_6 === '' ? 0 : data.hole_6},
        ${data.hole_6_win},
        ${data.hole_7 === '' ? 0 : data.hole_7},
        ${data.hole_7_win},
        ${data.hole_8 === '' ? 0 : data.hole_8},
        ${data.hole_8_win},
        ${data.hole_9 === '' ? 0 : data.hole_9},
        ${data.hole_9_win}
      )
      RETURNING *
    `;
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to add score' },
      { status: 500 }
    );
  }
} 