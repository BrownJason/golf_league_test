import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = await sql`
      INSERT INTO weekly_winnings (
        skins,
        greens,
        partners,
        week_date,
        player_id,
        best_ball,
        low_score
      ) VALUES (   
       ${data.skins},
       ${data.greens},
       ${data.partners},
       ${data.week_date},
       ${data.player_id},
       ${data.best_ball},
       ${data.low_score}
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