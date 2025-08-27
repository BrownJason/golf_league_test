/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as { user?: { isAdmin?: number } } | null;
    if (session?.user?.isAdmin !== 1) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Calculate total score
    const score = Object.entries(data)
      .filter(([key]) => key.startsWith('hole_'))
      .reduce((sum, [, value]) => sum + Number(value), 0);

    // Get player's current handicap
    const [player] = await sql`
      SELECT handicap 
      FROM players 
      WHERE player_id = ${data.player_id}
    `;

    // Calculate adjusted score (you may want to adjust this calculation based on your rules)
    const adjusted_score = score - player.handicap;

    const result = await sql`
      INSERT INTO weekly_score (
        player_id,
        week_date,
        side,
        score,
        handicap,
        adjusted_score,
        hole_1,
        hole_2,
        hole_3,
        hole_4,
        hole_5,
        hole_6,
        hole_7,
        hole_8,
        hole_9
      ) VALUES (
        ${data.player_id},
        ${data.week_date},
        ${data.side},
        ${score},
        ${player.handicap},
        ${adjusted_score},
        ${data.hole_1},
        ${data.hole_2},
        ${data.hole_3},
        ${data.hole_4},
        ${data.hole_5},
        ${data.hole_6},
        ${data.hole_7},
        ${data.hole_8},
        ${data.hole_9}
      )
      RETURNING *
    `;
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to add score' },
      { status: 500 }
    );
  }
} 

