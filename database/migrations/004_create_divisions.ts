import { type Kysely, sql } from "kysely";

const TABLE_NAME = "divisions";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable(TABLE_NAME)
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("tenantId", "bigint", (col) =>
      col.references("tenants.id").onDelete("cascade").notNull()
    )
    .addColumn("seasonId", "bigint", (col) =>
      col.references("seasons.id").onDelete("cascade").notNull()
    )
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(TABLE_NAME).execute();
}
