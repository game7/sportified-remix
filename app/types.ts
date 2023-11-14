import type { Generated } from "kysely";

export interface Database {
  tenants: TenantsTable;
  leagues: LeaguesTable;
  seasons: SeasonsTable;
  divisions: DivisionsTable;
  teams: TeamsTable;
}

export interface TenantsTable {
  id: Generated<number>;
  name: string;
}

export interface LeaguesTable {
  id: Generated<number>;
  tenantId: number;
  name: string;
}

export interface SeasonsTable {
  id: Generated<number>;
  tenantId: number;
  leagueId: number;
  name: string;
}

export interface DivisionsTable {
  id: Generated<number>;
  tenantId: number;
  seasonId: number;
  name: string;
}

export interface TeamsTable {
  id: Generated<number>;
  tenantId: number;
  divisionId: number;
  name: string;
}
