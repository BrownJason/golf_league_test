import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function PUT(
    request: Request,
    context: { params: Promise<{ player_id: string }> }) {
    try {
      console.log('Attempting to edit player scores...');
  
      const { player_id } = await context.params;
      const { hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9, week_date} = await request.json();
      
      const [player] = await sql`
      SELECT handicap 
      FROM players 
      WHERE player_id = ${player_id}
      `;
  
      const score = (parseInt(hole_1) + parseInt(hole_2)
        + parseInt(hole_3) + parseInt(hole_4) + parseInt(hole_5 )
        + parseInt(hole_6) + parseInt(hole_7) + parseInt(hole_8) + parseInt(hole_9));
  
      const data = await sql`
        UPDATE weekly_score
        SET score = ${score},
           handicap = ${player.handicap},
           adjusted_Score = ${score - player.handicap},
           hole_1 = ${hole_1},
           hole_2 = ${hole_2},
           hole_3 = ${hole_3},
           hole_4 = ${hole_4},
           hole_5 = ${hole_5},
           hole_6 = ${hole_6},
           hole_7 = ${hole_7},
           hole_8 = ${hole_8},
           hole_9 = ${hole_9}
        WHERE week_date = ${week_date}
        and player_id = ${player_id}
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