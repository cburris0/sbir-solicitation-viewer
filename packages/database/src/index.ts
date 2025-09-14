import { ExtractTablesWithRelations } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";
import { drizzle, PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const {
  DATABASE_URL,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

if (
  !DATABASE_URL ||
  !DATABASE_PORT ||
  !DATABASE_USERNAME ||
  !DATABASE_PASSWORD ||
  !DATABASE_NAME
) {
  throw new Error("Missing environment variable DATABASE_*");
}

const config = {
  host: DATABASE_URL,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  db: DATABASE_NAME,
  ssl: false,
  // NOTE: Commented out ssl because of local dev issues
  // ssl: process.env.DATABASE_SSL_DISABLED !== "true" && {
  //   rejectUnauthorized: false,
  // },
};

const client = postgres(config)
const db = drizzle(client, { schema });

client`SELECT 1`.catch(err => {
  console.error('DATABASE CONNECTION FAILED:', err.message);
  console.error('Make sure Docker/PostgreSQL is running!');
  process.exit(1);
});

export async function closeDatabase() {
  await client.end();
}

// client
export default db;

// schema
export * from "./schema";

// drizzle
export * from "drizzle-orm";
export type Transaction = PgTransaction<
  PostgresJsQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;
