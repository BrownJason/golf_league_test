import postgres from 'postgres';

export function createConnection() {
  return postgres(process.env.DATABASE_URL!, {
    ssl: {
      rejectUnauthorized: true,
    },
    idle_timeout: 20,
    max: 10,
    connect_timeout: 10,
  });
} 