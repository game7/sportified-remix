import { z } from "zod";
import { db as database } from "~/database.server";

const TABLE_NAME = "leagues";

export const leagueSchema = z.object({
  name: z
    .string()
    .min(1, "cannot be blank")
    .pipe(z.string().min(2, "must be longer than that")),
});
export const createLeagueSchema = leagueSchema;
export const updateLeagueSchema = leagueSchema;

async function listLeagues(tenantId: number, db = database) {
  return await db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("tenantId", "=", tenantId)
    .execute();
}

async function findLeague(id: number, db = database) {
  return await db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("id", "=", id)
    .limit(1)
    .executeTakeFirstOrThrow();
}

async function createLeague(
  tenantId: number,
  data: z.infer<typeof createLeagueSchema>,
  db = database
) {
  const parsed = createLeagueSchema.parse(data);

  return await db
    .insertInto(TABLE_NAME)
    .values({ tenantId, ...parsed })
    .returningAll()
    .executeTakeFirstOrThrow();
}

async function updateLeague(
  id: number,
  data: z.infer<typeof updateLeagueSchema>,
  db = database
) {
  const parsed = updateLeagueSchema.parse(data);

  return await db
    .updateTable(TABLE_NAME)
    .where("id", "=", id)
    .set(parsed)
    .returningAll()
    .executeTakeFirst();
}

async function deleteTenant(id: number, db = database) {
  return await db
    .deleteFrom(TABLE_NAME)
    .where("id", "=", id)
    .executeTakeFirst();
}

export const leagues = {
  find: findLeague,
  list: listLeagues,
  create: createLeague,
  update: updateLeague,
  delete: deleteTenant,
};

export type Leagues = typeof leagues;
