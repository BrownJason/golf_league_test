import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const weeks = await sql`
      SELECT DISTINCT 
        TO_CHAR(week_date, 'MM/DD/YYYY') as formatted_date,
        week_date
      FROM weekly_score
      ORDER BY week_date DESC
    `;

    return NextResponse.json(weeks);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weeks' },
      { status: 500 }
    );
  }
} 