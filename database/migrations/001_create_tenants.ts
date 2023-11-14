import { type Kysely, sql } from "kysely";

const TABLE_NAME = "tenants";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable(TABLE_NAME)
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(TABLE_NAME).execute();
}
