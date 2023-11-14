import { z } from "zod";
import { db as database } from "~/database.server";

const TABLE_NAME = "teams";

export const teamSchema = z.object({
  name: z
    .string()
    .min(1, "cannot be blank")
    .pipe(z.string().min(2, "must be longer than that")),
});
export const createTeamSchema = teamSchema;
export const updateTeamSchema = teamSchema;

async function listTeams(
  {
    tenantId,
    divisionId,
  }: {
    tenantId: number;
    divisionId?: number;
  },
  db = database
) {
  let query = db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("tenantId", "=", tenantId);
  if (divisionId) {
    query = query.where("divisionId", "=", divisionId);
  }
  return query.execute();
}

async function findTeam(id: number, db = database) {
  return await db
    .selectFrom(TABLE_NAME)
    .selectAll()
    .where("id", "=", id)
    .limit(1)
    .executeTakeFirstOrThrow();
}

async function createTeam(
  tenantId: number,
  divisionId: number,
  data: z.infer<typeof createTeamSchema>,
  db = database
) {
  const parsed = createTeamSchema.parse(data);

  return await db
    .insertInto(TABLE_NAME)
    .values({ tenantId, divisionId, ...parsed })
    .returningAll()
    .executeTakeFirstOrThrow();
}

async function updateTeam(
  id: number,
  data: z.infer<typeof updateTeamSchema>,
  db = database
) {
  const parsed = updateTeamSchema.parse(data);

  return await db
    .updateTable(TABLE_NAME)
    .where("id", "=", id)
    .set(parsed)
    .returningAll()
    .executeTakeFirst();
}

async function deleteTeam(id: number, db = database) {
  return await db
    .deleteFrom(TABLE_NAME)
    .where("id", "=", id)
    .executeTakeFirst();
}

export const teams = {
  find: findTeam,
  list: listTeams,
  create: createTeam,
  update: updateTeam,
  delete: deleteTeam,
};

export type Teams = typeof teams;
