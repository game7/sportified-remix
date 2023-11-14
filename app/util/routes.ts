import { type DefineRouteOptions } from "@remix-run/dev/dist/config/routes";

export interface RouteDefinition {
  path: string | undefined;
  file: string;
  options?: DefineRouteOptions;
  children?: RouteDefinition[];
}

export function route(
  path: string,
  file: string,
  options: DefineRouteOptions = {},
  children: RouteDefinition[] = []
): RouteDefinition {
  return { path, file, options, children };
}
