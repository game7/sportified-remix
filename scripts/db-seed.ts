import { app } from "~/models/app.server";

(async function seed() {
  const tenants = {
    mullett: await app.tenants.create({ name: "Mullett" }),
  };
  const leagues = {
    maha: await app.leagues.create(tenants.mullett.id, { name: "MAHA" }),
  };
})();
