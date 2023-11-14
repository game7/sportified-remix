import pg from "pg";
import { config } from "~/database.server";

(async function main() {
  let client = new pg.Client({ ...config, database: "" });

  const { database } = config;

  await client.connect();

  let results = await client.query(
    "SELECT datname FROM pg_catalog.pg_database WHERE datname = $1;",
    ["sportified_development"]
  );

  if (results.rowCount === 1) {
    console.log("DROPPING DATABASE");
    console.log(await client.query(`DROP DATABASE "${database}"`));
    console.log(await client.query(`CREATE DATABASE "${database}"`));
  } else {
    console.log("OOPS! DATABASE DOES NOT EXIST");
  }

  await client.end();

  process.exit(0);
})();
