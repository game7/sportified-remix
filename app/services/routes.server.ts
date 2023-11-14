import { type AppConfig } from "@remix-run/dev";
import { hostRoutes } from "~/modules/host/routes";
import { publicRoutes } from "~/modules/public/routes";
import { utilRoutes } from "~/modules/util/routes";

export const routes: AppConfig["routes"] = async (defineRoutes) => {
  return defineRoutes((route) => {
    utilRoutes(route);
    hostRoutes(route);
    publicRoutes(route);
  });
};
