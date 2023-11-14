import { z } from "zod";
import { db as database } from "~/database.server";
import { invariant } from "@epic-web/invariant";

const tenantSchema = z.object({
  name: z
    .string()
    .min(1, "cannot be blank")
    .pipe(z.string().min(2, "must be longer than that")),
});
const createTenantSchema = tenantSchema;
const updateTenantSchema = tenantSchema;

async function listTenants(db = database) {
  return await db.selectFrom("tenants").selectAll().execute();
}

async function findTenant(id: number, db = database) {
  return await db
    .selectFrom("tenants")
    .selectAll()
    .where("id", "=", id)
    .limit(1)
    .executeTakeFirstOrThrow();
}

async function createTenant(
  data: z.infer<typeof createTenantSchema>,
  db = database
) {
  const parsed = createTenantSchema.parse(data);

  const result = await db
    .insertInto("tenants")
    .values(parsed)
    .returningAll()
    .executeTakeFirst();

  invariant(result, "tenant could not be created");

  return result;
}

async function updateTenant(
  id: number,
  data: z.infer<typeof updateTenantSchema>,
  db = database
) {
  const parsed = updateTenantSchema.parse(data);

  return await db
    .updateTable("tenants")
    .where("id", "=", id)
    .set(parsed)
    .executeTakeFirst();
}

async function deleteTenant(id: number, db = database) {
  return await db.deleteFrom("tenants").where("id", "=", id).executeTakeFirst();
}

export const tenants = {
  find: findTenant,
  list: listTenants,
  create: createTenant,
  update: updateTenant,
  delete: deleteTenant,
};

export type Tenants = typeof tenants;
