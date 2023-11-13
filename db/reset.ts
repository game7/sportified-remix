import postgres from "postgres";
import config from "../drizzle.config";

(async function main() {
  let client = postgres("", { ...config.dbCredentials, max: 1, database: "" });

  const { database } = config.dbCredentials;
  let results =
    await client`SELECT datname FROM pg_catalog.pg_database WHERE datname = ${database};`;

  if (results.length === 1) {
    await client.unsafe(`DROP DATABASE "${database}"`);
    await client.unsafe(`CREATE DATABASE "${database}"`);
  }

  process.exit(0);
})();
