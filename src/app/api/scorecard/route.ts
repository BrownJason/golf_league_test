import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const sql = getDatabase();

  try {
    const scorecard = await sql`
      SELECT * FROM scorecard
    `;

    return NextResponse.json(scorecard);
  } catch (error) {
    console.error('Error fetching scorecard:', error);
    return NextResponse.json({ error: 'Failed to fetch scorecard' }, { status: 500 });
  }
}   