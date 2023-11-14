import * as fs from "fs";
import { readConfig } from "@remix-run/dev/dist/config";

async function getPaths() {
  const config = await readConfig();
  const { routes } = config;
  const paths: string[] = [];

  function ancestryPath(
    path: Array<string | undefined>,
    parentId: string | undefined
  ): Array<string | undefined> {
    const parent = parentId ? routes[parentId] : null;

    if (!parent) {
      return path;
    }

    const ancestry = ancestryPath([parent.path], parent.parentId);

    return [...ancestry, ...path];
  }

  Object.keys(config.routes)
    .filter((key) => {
      if (key === "root") {
        return false;
      }
      if (key.endsWith("_layout")) {
        return false;
      }

      return true;
    })
    .map((key) => routes[key])
    .forEach((route) => {
      const parts = ancestryPath([route.path], route.parentId).filter(
        (part) => !!part
      );
      const path =
        "/" +
        parts
          .filter((part) => !!part) // remove null or empties
          .map((part) => part?.replace(/\/$/, "")) // trim trailing slashes
          .join("/");
      paths.push(path);
    });

  return paths;
}

function writePaths(paths: string[]) {
  const output = [];
  output.push('import { path } from "static-path";');
  output.push("");
  output.push("export const paths = {");
  paths.forEach((path) => {
    output.push(`  '${path}': path('${path}'),`);
  });
  output.push("};");

  fs.writeFileSync("./app/util/paths.ts", output.join("\n"));
}

(async function () {
  const paths = await getPaths();
  writePaths(paths);
  console.log(paths);
})();
