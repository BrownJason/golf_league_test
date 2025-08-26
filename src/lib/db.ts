/* eslint-disable @typescript-eslint/no-unused-vars */
import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;

export function getDatabase() {
  if (!sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    sql = postgres(process.env.DATABASE_URL, {
      ssl: {
        rejectUnauthorized: true,
      },
      idle_timeout: 20,
      max: 40,
      connect_timeout: 10,
    });
  }
  return sql;
}

export async function closeDatabase() {
  if (sql) {
    await sql.end();
    sql = null;
  }
}

export async function testConnection() {
  const db = getDatabase();
  try {
    await db`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
} 