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
      UPDATE weekly_winnings 
       SET skins = ${res.skins},
       greens = ${res.greens},
       partners = ${res.partners},
       best_ball = ${res.best_ball},
       low_score = ${res.low_score}
        WHERE week_date = ${res.week_date}
        and player_id = ${player_id}
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