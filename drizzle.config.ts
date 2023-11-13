import "dotenv/config";
import type { Config } from "drizzle-kit";

const config = {
  schema: "./db/schema",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST || "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "sportified_development",
    port: parseInt(process.env.DB_PORT || "5432"),
  },
} satisfies Config;

export default config;

export const url = (() => {
  const { host, user, password, database, port } = config.dbCredentials;
  return `postgres://${user}:${password}@${host}:${port}/${database}`;
})();
