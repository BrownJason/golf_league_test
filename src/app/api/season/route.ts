import { getDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    const sql = getDatabase();

    try {
        console.log('Fetchin season info...');

        const season_info = await sql`
            SELECT SUM(total_players) total_players, sum(weeks_played) weeks_played, SUM(total_players) * SUM(weeks_played) rounds_played, TO_CHAR(sum(season_pot), '$999,999.99') season_pot
            FROM (
            Select count(p.*) total_players, DIV(COUNT(ws.week_date), count(p.*)) weeks_played, sum(ww.greens + ww.skins + ww.best_ball + ww.partners + ww.low_score) season_pot
            from players p
            left join weekly_score ws
            on ws.player_id = p.player_id
            left join weekly_winnings ww
            on ww.player_id = p.player_id
            WHERE TO_CHAR(ws.week_date, 'yyyy') = TO_CHAR(CURRENT_DATE, 'YYYY')
            GROUP BY ws.week_date
            ) season_info

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