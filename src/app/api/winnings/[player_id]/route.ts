import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { authOptions } from '../../auth/[...nextauth]/route';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function PUT(
    request: Request,
    context: { params: Promise<{ player_id: string }> }) {
  try {

    const session = await getServerSession(authOptions) as { user?: { isAdmin?: boolean } } | null;
    if (!session?.user?.isAdmin) {
    return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
    );
    }
    
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