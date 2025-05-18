import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { 
  ssl: "verify-full",
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET() {
  try {
    console.log('Attempting to fetch weekly scores...');

    const data = await sql`
      SELECT 
        ws.id, 
        p.player_id, 
        p.player_name, 
        ws.score, 
        ws.handicap, 
        ws.adjusted_score, 
        ws.hole_1,
        ws.hole_2, 
        ws.hole_3, 
        ws.hole_4, 
        ws.hole_5, 
        ws.hole_6, 
        ws.hole_7, 
        ws.hole_8,
        ws.hole_9, 
        ws.week_date, 
        ws.side 
      FROM weekly_score ws
      JOIN players p ON p.player_id = ws.player_id
      WHERE TO_CHAR(ws.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
      ORDER BY ws.week_date DESC, p.player_id ASC
    `;

    console.log(`Successfully fetched ${data.length} weekly scores`);

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
      }
    });
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
