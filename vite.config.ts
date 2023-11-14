import { unstable_vitePlugin as remix, type AppConfig } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { type RouteDefinition } from "~/util/routes";
import { routes as definitions } from "./routes";
import remixConfig from "./remix.config";

export const routes: AppConfig["routes"] = async (defineRoutes) => {
  return defineRoutes((route) => {
    (function define(definitions: RouteDefinition[]) {
      definitions.forEach((def) => {
        route(def.path, def.file, def.options, () => {
          def.children && define(def.children);
        });
      });
    })(definitions as RouteDefinition[]);
  });
};

export default defineConfig({
  plugins: [tsconfigPaths(), remix(remixConfig)],
});
