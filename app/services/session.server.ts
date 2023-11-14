import { invariant } from "@epic-web/invariant";
import { createCookieSessionStorage } from "@remix-run/node";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const { getSession, commitSession, destroySession } = sessionStorage;

export { commitSession, destroySession, getSession };

// export async function getSession(request: Request) {
//   const cookie = request.headers.get("Cookie");
//   return await sessionStorage.getSession(cookie);
// }

// export async function setSession(request: Request) {}

// const TENANT_ID_KEY = "tenantId";

// export async function getTenantId(request: Request) {
//   const session = await getSession(request);
//   const tenantId = session.get(TENANT_ID_KEY);
//   return tenantId ? parseInt(tenantId) : null;
// }

// export async function setTenantId(request: Request, tenantId: number) {
//   const session = await getSession(request);
//   session.set(TENANT_ID_KEY, tenantId);
// }
