import { z } from "zod";
import { db as database } from "~/database.server";
import {
  createDivisionSchema,
  divisions as divisionsModel,
} from "./divisions.server";

const TABLE_NAME = "seasons";

export const seasonSchema = z.object({
  name: z
    .string()
    .min(1, "cannot be blank")
    .pipe(z.string().min(2, "must be longer than that")),
});
export const createSeasonSchema = seasonSchema.merge(
  z.object({
    divisions: createDivisionSchema.array().optional(),
  })
);
export const updateSeasonSchema = seasonSchema;

async function listSeasons(
  {
    tenantId,
    leagueId,
  }: {
    tenantId: number;
    leagueId?: number;
  },
  db = database
) {
  let query = db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("tenantId", "=", tenantId);
  if (leagueId) {
    query = query.where("leagueId", "=", leagueId);
  }
  return query.execute();
}

async function findSeason(id: number, db = database) {
  return await db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("id", "=", id)
    .limit(1)
    .executeTakeFirstOrThrow();
}

async function createSeason(
  tenantId: number,
  leagueId: number,
  data: z.infer<typeof createSeasonSchema>,
  db = database
) {
  console.log(data);
  console.log(createSeasonSchema.safeParse(data).error);
  const { divisions = [], ...season } = createSeasonSchema.parse(data);

  return await db.transaction().execute(async (txn) => {
    const result = await txn
      .insertInto(TABLE_NAME)
      .values({ tenantId, leagueId, ...season })
      .returningAll()
      .executeTakeFirstOrThrow();

    await Promise.all(
      divisions.map((division) =>
        divisionsModel.create(tenantId, result.id, division, txn)
      )
    );

    return result;
  });
}

async function updateSeason(
  id: number,
  data: z.infer<typeof updateSeasonSchema>,
  db = database
) {
  const parsed = updateSeasonSchema.parse(data);

  return await db
    .updateTable(TABLE_NAME)
    .where("id", "=", id)
    .set(parsed)
    .returningAll()
    .executeTakeFirst();
}

async function deleteSeason(id: number, db = database) {
  return await db
    .deleteFrom(TABLE_NAME)
    .where("id", "=", id)
    .executeTakeFirst();
}

export const seasons = {
  find: findSeason,
  list: listSeasons,
  create: createSeason,
  update: updateSeason,
  delete: deleteSeason,
};

export type Seasons = typeof seasons;
