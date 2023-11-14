import { tenants } from "~/routers/tenants";

export function withRouter() {
  return tenants.createCaller({});
}
