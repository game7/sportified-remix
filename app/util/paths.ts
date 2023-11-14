import { path } from "static-path";

export const paths = {
  '/': path('/'),
  '/admin': path('/admin'),
  '/admin/leagues/:id': path('/admin/leagues/:id'),
  '/admin/leagues/:leagueId/seasons': path('/admin/leagues/:leagueId/seasons'),
  '/admin/leagues/:leagueId/seasons/new': path('/admin/leagues/:leagueId/seasons/new'),
  '/admin/leagues': path('/admin/leagues'),
  '/admin/leagues/new': path('/admin/leagues/new'),
  '/host': path('/host'),
  '/host/tenants/:id': path('/host/tenants/:id'),
  '/host/tenants/:id/delete': path('/host/tenants/:id/delete'),
  '/host/tenants/:id/settings': path('/host/tenants/:id/settings'),
  '/host/tenants': path('/host/tenants'),
  '/host/tenants/new': path('/host/tenants/new'),
  '/util/tenants': path('/util/tenants'),
};