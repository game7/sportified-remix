import { redirect } from "@remix-run/node";
import { tenants } from "~/models/tenant.server";
import { paths } from "~/util/paths";
import { getSession } from "./session.server";

export async function currentTenant(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  try {
    return await tenants.find(session.data.tenantId);
  } catch {
    throw redirect(paths["/util/tenants"]({}));
  }
}
