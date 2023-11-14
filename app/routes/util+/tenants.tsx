import { Button } from "@mantine/core";
import {
  type LoaderFunctionArgs,
  json,
  redirect,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { tenants } from "~/models/tenant.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  return json({
    tenants: await tenants.list(),
  });
};

const schema = z.object({
  tenantId: z.coerce.number(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const payload = Object.fromEntries(await request.formData());
  const data = schema.parse(payload);

  const session = await getSession(request.headers.get("Cookie"));
  session.set("tenantId", data.tenantId.toString());

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function TenantsIndex() {
  const { tenants } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <>
      <div>Tenants Index</div>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            {tenant.name}
            <fetcher.Form method="post">
              <input type="hidden" name="tenantId" value={tenant.id} />
              <Button type="submit">Select</Button>
            </fetcher.Form>
          </li>
        ))}
      </ul>
    </>
  );
}
