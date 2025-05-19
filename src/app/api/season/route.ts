import { getDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    const sql = getDatabase();

    try {
        console.log('Fetchin season info...');

        const season_info = await sql`
            WITH current_year_players AS (
                SELECT DISTINCT p.player_id
                FROM players p
                LEFT JOIN weekly_score ws ON p.player_id = ws.player_id AND EXTRACT(YEAR FROM ws.week_date) = EXTRACT(YEAR FROM CURRENT_DATE)
                WHERE ws.player_id IS NOT NULL OR p.player_id NOT IN (SELECT DISTINCT player_id FROM weekly_winnings WHERE EXTRACT(YEAR FROM week_date) = EXTRACT(YEAR FROM CURRENT_DATE))
            ),
            season_info AS (
                SELECT 
                    COUNT(DISTINCT p.player_id) AS total_players,
                    COUNT(DISTINCT ws.week_date) AS weeks_played,
                    COUNT(ws.score) AS rounds_played,
                    SUM(COALESCE(ww.greens, 0) + COALESCE(ww.skins, 0) + COALESCE(ww.best_ball, 0) + COALESCE(ww.partners, 0) + COALESCE(ww.low_score, 0)) AS season_pot
                FROM current_year_players p
                LEFT JOIN weekly_score ws ON ws.player_id = p.player_id AND EXTRACT(YEAR FROM ws.week_date) = EXTRACT(YEAR FROM CURRENT_DATE)
                LEFT JOIN weekly_winnings ww ON ww.player_id = p.player_id AND EXTRACT(YEAR FROM ww.week_date) = EXTRACT(YEAR FROM CURRENT_DATE)
            )
            SELECT 
                total_players,
                weeks_played,
                rounds_played,
                TO_CHAR(season_pot, '$999,999.99') AS season_pot
            FROM season_info
        `;
        console.log(`Successfully fetch ${season_info.length} season_info`);

        return new NextResponse(JSON.stringify(season_info), {
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
    console.error('Database Error:', error);
    return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch players' }), 
        { status: 500 }
    );
    }
}