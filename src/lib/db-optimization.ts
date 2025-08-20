/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';

// Connection pool for PostgreSQL (adjust for your database)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function executeQuery(text: string, params?: any[]) {
  const start = Date.now();
  const client = await pool.connect();
  
  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    return result;
  } finally {
    client.release();
  }
}

// Batch multiple queries into a single database call
export async function executeBatchQueries(queries: Array<{text: string, params?: any[]}>) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const results = [];
    
    for (const query of queries) {
      const result = await client.query(query.text, query.params);
      results.push(result);
    }
    
    await client.query('COMMIT');
    return results;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Query result caching
const queryCache = new Map<string, { data: any; timestamp: number }>();

export async function getCachedQuery(key: string, queryFn: () => Promise<any>, ttlMs: number = 300000) {
  const cached = queryCache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data;
  }
  
  const data = await queryFn();
  queryCache.set(key, { data, timestamp: Date.now() });
  return data;
}
