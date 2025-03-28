import postgres from "postgres";
import { WeeklyScore } from "../weekly_score/columns";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export async function fetchPlayers() {
  try {
    console.log("Fetching Players data...");
    const data = await sql`SELECT p.player_id, p.player_name, p.handicap, ws.score, ws.hole_1,
            ws.hole_2,ws.hole_3,ws.hole_4,ws.hole_5,ws.hole_6,ws.hole_7,ws.hole_8,ws.hole_9,
            ww.skins,ww.greens,ww.partners, ww.week_date  FROM public.players p, public.weekly_score ws, public.weekly_winnings ww
             WHERE ws.player_id = p.player_id
             AND ww.player_id = ws.player_id
             AND ww.week_date = ws.week_date
              ORDER BY p.player_name asc`;
    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Players data.");
  }
}

export async function fetchWeeklyScores() {
  try {
    console.log("Fetching weekly score data...");
    const data = await sql<WeeklyScore[]>`SELECT ws.id, p.player_id, p.player_name, ws.score, 
            ws."handicap", ws.adjusted_score, ws.hole_1,
            ws.hole_2, ws.hole_3, ws.hole_4, ws.hole_5, ws.hole_6, ws.hole_7, ws.hole_8,
            ws.hole_9, ws.week_date, ws.side FROM weekly_score ws, players p
                  WHERE p.player_id = ws.player_id
                  ORDER BY player_id asc`;
    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch weekly score data.");
  }
}

export async function fetchPlayer(player_id: number) {
  try {
    console.log("Fetching Players data...");
    const data = await sql`SELECT p.*  FROM public.players p
                 WHERE p.player_id = ${player_id}
                  ORDER BY p.player_name asc`;
    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Players data.");
  }
}

export async function fetchPlayerScores(player_id: number) {
  try {
    console.log("Fetching Players data...");
    const data = await sql<WeeklyScore[]>`SELECT ws.id, p.player_id, p.player_name, ws.score, 
            ws."handicap", ws.adjusted_score, ws.hole_1,
            ws.hole_2, ws.hole_3, ws.hole_4, ws.hole_5, ws.hole_6, ws.hole_7, ws.hole_8,
            ws.hole_9, ws.week_date, ws.side FROM weekly_score ws, players p
                  WHERE p.player_id = ws.player_id
                  AND p.player_id = ${player_id}
                    ORDER BY ws.week_date asc`;
    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Players data.");
  }
}

export async function fetchPlayerWinnings(player_id: number) {
  try {
    console.log("Fetching Players data...");
    const data = await sql`SELECT p.*  FROM public.weekly_winnings p
                   WHERE p.player_id = ${player_id}
                    ORDER BY p.week_date asc`;
    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Players data.");
  }
}
