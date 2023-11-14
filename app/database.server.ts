import { type Database } from "./types"; // this is the Database interface we defined earlier
// import { Pool } from "pg";
import { Kysely, type LogEvent, PostgresDialect } from "kysely";
import pg from "pg";
const { Pool } = pg;

export const config = {
  max: 10,
  host: process.env.DB_HOST || "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "sportified_development",
  port: parseInt(process.env.DB_PORT || "5432"),
};

const pool = new Pool(config);

const dialect = new PostgresDialect({ pool });

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
  log: (event: LogEvent) => {
    if (event.level == "query") {
      console.log(event.query.sql, event.query.parameters);
    }
  },
});
