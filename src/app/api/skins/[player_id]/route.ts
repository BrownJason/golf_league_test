import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function PUT(
    request: Request,
    context: { params: Promise<{ player_id: string }> }) {
  try {
    const { player_id } = await context.params;
    const res = await request.json();

    const data = await sql`
      UPDATE skins_Score 
      SET side = ${res.side},
      hole_1 =${res.hole_1 === '' ? 0 : res.hole_1},
      hole_1_win =${res.hole_1_win},
      hole_2 =${res.hole_2  === '' ? 0 : res.hole_2},
      hole_2_win =${res.hole_2_win},
      hole_3 =${res.hole_3 === '' ? 0 : res.hole_3},
      hole_3_win =${res.hole_3_win},
      hole_4 =${res.hole_4 === '' ? 0 : res.hole_4},
      hole_4_win =${res.hole_4_win},
      hole_5 =${res.hole_5 === '' ? 0 : res.hole_5},
      hole_5_win =${res.hole_5_win},
      hole_6 =${res.hole_6 === '' ? 0 : res.hole_6},
      hole_6_win =${res.hole_6_win},
      hole_7 =${res.hole_7 === '' ? 0 : res.hole_7},
      hole_7_win =${res.hole_7_win},
      hole_8 =${res.hole_8 === '' ? 0 : res.hole_8},
      hole_8_win = ${res.hole_8_win},
      hole_9 = ${res.hole_9 === '' ? 0 : res.hole_9},
      hole_9_win =${res.hole_9_win}
      WHERE player_id = ${player_id}
      AND week_date = ${res.week_date}
    `;
    
// Return empty array if no data
    if (!data || data.length === 0) {
        return NextResponse.json([], {
            headers: {
            'Cache-Control': 'no-store, must-revalidate',
            'Pragma': 'no-cache',
            }
        });
    }

    return NextResponse.json(data, {
    headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
    } });
} catch (error) {
    console.error('Database Error:', error);
    if (error instanceof Error) {
    console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
    });
    }
    
    return NextResponse.json(
    { error: 'Failed to fetch weekly scores', details: error instanceof Error ? error.message : 'Unknown error' },
    { 
        status: 500,
        headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        }
    }
    );
} finally {
    await sql.end();
}
} 