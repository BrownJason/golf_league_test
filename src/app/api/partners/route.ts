import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'verify-full' });

export const dynamic = 'force-dynamic';
export const revalidate = false;

// POST: Add a new partner score
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { player1_id, player2_id, player1_score, player2_score, week_date } = data;
    if (!player1_id || !player2_id || player1_id === player2_id) {
      return NextResponse.json({ error: 'Two different players are required.' }, { status: 400 });
    }
    if (
      typeof player1_score !== 'number' ||
      typeof player2_score !== 'number' ||
      isNaN(player1_score) ||
      isNaN(player2_score)
    ) {
      return NextResponse.json({ error: 'Scores must be numbers.' }, { status: 400 });
    }
    if (!week_date) {
      return NextResponse.json({ error: 'Week date is required.' }, { status: 400 });
    }
    const combined_score = player1_score + player2_score;
    const result = await sql`
      INSERT INTO partners (
        player1_id,
        player2_id,
        player1_score,
        player2_score,
        combined_score,
        week_date
      ) VALUES (
        ${player1_id},
        ${player2_id},
        ${player1_score},
        ${player2_score},
        ${combined_score},
        ${week_date}
      )
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to add partner score' },
      { status: 500 }
    );
  }
}

// GET: List partner scores (optionally by week_date)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const week_date = searchParams.get('week_date');
    console.log(week_date)
    let results;
    if (week_date) {
      results = await sql`
        SELECT * FROM partners WHERE week_date = ${week_date}
      `;
    } else {
      results = await sql`SELECT * FROM partners`;
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partner scores' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing partner score by id
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, player1_id, player2_id, player1_score, player2_score, week_date } = data;
    if (!id) {
      return NextResponse.json({ error: 'ID is required for update.' }, { status: 400 });
    }
    if (!player1_id || !player2_id || player1_id === player2_id) {
      return NextResponse.json({ error: 'Two different players are required.' }, { status: 400 });
    }
    if (
      typeof player1_score !== 'number' ||
      typeof player2_score !== 'number' ||
      isNaN(player1_score) ||
      isNaN(player2_score)
    ) {
      return NextResponse.json({ error: 'Scores must be numbers.' }, { status: 400 });
    }
    if (!week_date) {
      return NextResponse.json({ error: 'Week date is required.' }, { status: 400 });
    }
    const combined_score = player1_score + player2_score;
    const result = await sql`
      UPDATE partners SET
        player1_id = ${player1_id},
        player2_id = ${player2_id},
        player1_score = ${player1_score},
        player2_score = ${player2_score},
        combined_score = ${combined_score},
        week_date = ${week_date}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: 'Partner score not found.' }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update partner score' },
      { status: 500 }
    );
  }
}
