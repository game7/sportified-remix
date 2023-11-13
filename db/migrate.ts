import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import config from "../drizzle.config";

async function createDatabaseIfDoesNotExist() {
  let client = postgres("", { ...config.dbCredentials, max: 1, database: "" });

  const { database } = config.dbCredentials;
  let results =
    await client`SELECT datname FROM pg_catalog.pg_database WHERE datname = ${database};`;

  if (results.length === 0) {
    console.log(`Database '${database}' does not exist and will be created`);
    await client.unsafe(`CREATE DATABASE "${database}"`);
    console.log(`Database '${database}' has been created`);
  }
}

async function runDatabaseMigrations() {
  const client = postgres("", { ...config.dbCredentials, max: 1 });
  const db = drizzle(client, {});

  await migrate(db, { migrationsFolder: config.out });
}

(async function main() {
  await createDatabaseIfDoesNotExist();
  await runDatabaseMigrations();

  process.exit(0);
})();
