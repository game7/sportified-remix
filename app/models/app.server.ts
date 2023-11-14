import { leagues, type Leagues } from "./leagues.server";
import { seasons, type Seasons } from "./seasons.server";
import { tenants, type Tenants } from "./tenant.server";

export type App = {
  Leagues: Leagues;
  Seasons: Seasons;
  Tenants: Tenants;
};

export const app = {
  leagues,
  seasons,
  tenants,
};
