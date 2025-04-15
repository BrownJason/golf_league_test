import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;

export function getDatabase() {
  if (!sql) {
    sql = postgres(process.env.DATABASE_URL!, {
      ssl: {
        rejectUnauthorized: true,
      },
      idle_timeout: 20,
      max: 10,
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