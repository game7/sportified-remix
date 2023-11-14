import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator, type MigratorProps } from "kysely";
import * as path from "path";
import { db } from "../app/database.server";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function () {
  console.log("------- setup ----------");
  const props: MigratorProps = {
    db: db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../database/migrations"),
    }),
  };
  console.log(props);
  console.log(path.join(__dirname, "../database/migrations/"));
  console.log("------- starting ----------");
  const result = await new Migrator(props).migrateToLatest();
  console.log(result);
  console.log("------- done ----------");
  process.exit(0);
})();
