import postgres from "postgres";
import { WeeklyScore } from "../weekly_score/score-columns";
import { PlayerScore } from "../players/[player_id]/columns";
import { WeeklyWinnings } from "../weekly_score/winnings-columns";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export async function fetchPlayers() {
  try {
    console.log("Fetching Players data...");
    const data = await sql`SELECT p.player_id, p.player_name FROM public.players p
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
                  ORDER BY ws.week_date, p.player_id  asc`;
    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch weekly score data.");
  }
}

export async function fetchWeeklyWinnings() {
  try {
    console.log("Fetching weekly score data...");
    const data = await sql<WeeklyWinnings[]>`SELECT ws.id, p.player_id, p.player_name, ws.skins, 
            ws.greens, ws.partners, ws.best_ball, ws.low_score, ws.week_date FROM weekly_winnings ws, players p
                  WHERE p.player_id = ws.player_id
                  ORDER BY ws.week_date, p.player_id asc`;
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
    const data = await sql<PlayerScore[]>`SELECT ws.id, p.player_id, p.player_name, ws.score, 
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
export async function fetchPlayerScoresByWeek(player_id: number, selectedWeek: string) {
  try {
    console.log("Fetching Players data...");
    const data = await sql<PlayerScore[]>`SELECT ws.id, p.player_id, p.player_name, ws.score, 
            ws."handicap", ws.adjusted_score, ws.hole_1,
            ws.hole_2, ws.hole_3, ws.hole_4, ws.hole_5, ws.hole_6, ws.hole_7, ws.hole_8,
            ws.hole_9, ws.week_date, ws.side FROM weekly_score ws, players p
                  WHERE p.player_id = ws.player_id
                  AND p.player_id = ${player_id}
                  AND ws.week_date = TO_DATE(${selectedWeek}, 'MM/DD/YYYY')
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
    const data = await sql`SELECT p.player_id, sum(p.skins) skins, sum(p.greens) greens, sum(p.partners) partners, sum(p.best_ball) best_ball, sum(p.low_score) low_score  FROM public.weekly_winnings p
                   WHERE p.player_id = ${player_id}
                   group by p.player_id
                    ORDER BY p.player_id asc`;
    console.log("Data fetch completed after 3 seconds.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Players data.");
  }
}

export async function fetchWeeks() {
  try {
    console.log("Fetching distinct weeks");
    const data = await sql`SELECT DISTINCT WEEK_DATE FROM weekly_score
    UNION
    SELECT null AS WEEK_DATE FROM weekly_score`;
    console.log("Data fetch completed after 3 seconds");

    return data;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Failed to fetch distinct weeks");
  }
}
