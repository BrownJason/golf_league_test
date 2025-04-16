import { getDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET() {
  const sql = getDatabase();
  
  try {
    const weeks = await sql`
      SELECT DISTINCT 
        TO_CHAR(week_date, 'MM/DD/YYYY') as formatted_date,
        week_date
      FROM weekly_score
      ORDER BY week_date DESC
    `;

    
    return new NextResponse(JSON.stringify(weeks), {
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
    return NextResponse.json(
      { error: 'Failed to fetch weeks' },
      { status: 500 }
    );
  }
} 