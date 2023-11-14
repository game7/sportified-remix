import { z } from "zod";
import { db as database } from "~/database.server";

const TABLE_NAME = "divisions";

export const divisionSchema = z.object({
  name: z
    .string()
    .min(1, "cannot be blank")
    .pipe(z.string().min(2, "must be longer than that")),
});
export const createDivisionSchema = divisionSchema;
export const updateDivisionSchema = divisionSchema;

async function listDivisions(
  {
    tenantId,
    seasonId,
  }: {
    tenantId: number;
    seasonId?: number;
  },
  db = database
) {
  let query = db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("tenantId", "=", tenantId);
  if (seasonId) {
    query = query.where("seasonId", "=", seasonId);
  }
  return query.execute();
}

async function findDivision(id: number, db = database) {
  return await db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("id", "=", id)
    .limit(1)
    .executeTakeFirstOrThrow();
}

async function createDivision(
  tenantId: number,
  seasonId: number,
  data: z.infer<typeof createDivisionSchema>,
  db = database
) {
  const parsed = createDivisionSchema.parse(data);

  return await db
    .insertInto(TABLE_NAME)
    .values({ tenantId, seasonId, ...parsed })
    .returningAll()
    .executeTakeFirstOrThrow();
}

async function updateDivision(
  id: number,
  data: z.infer<typeof updateDivisionSchema>,
  db = database
) {
  const parsed = updateDivisionSchema.parse(data);

  return await db
    .updateTable(TABLE_NAME)
    .where("id", "=", id)
    .set(parsed)
    .returningAll()
    .executeTakeFirst();
}

async function deleteDivision(id: number, db = database) {
  return await db
    .deleteFrom(TABLE_NAME)
    .where("id", "=", id)
    .executeTakeFirst();
}

export const divisions = {
  find: findDivision,
  list: listDivisions,
  create: createDivision,
  update: updateDivision,
  delete: deleteDivision,
};

export type Divisions = typeof divisions;
