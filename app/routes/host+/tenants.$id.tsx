import { Button } from "@mantine/core";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { PageHeader } from "~/components/page-header";
import { tenants } from "~/models/tenant.server";
import { paths } from "~/util/paths";

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    tenant: await tenants.find(z.coerce.number().parse(params.id)),
  };
}

export default function TenantsShow() {
  const { tenant } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader
        title={tenant.name}
        actions={
          <>
            <Button
              component="a"
              href={paths["/host/tenants/:id/edit"]({
                id: tenant.id.toString(),
              })}
            >
              Edit
            </Button>
            <DeleteButton id={tenant.id} />
          </>
        }
      />
    </>
  );
}

function DeleteButton({ id }: { id: number }) {
  return (
    <form
      action={paths["/host/tenants/:id/delete"]({ id: id.toString() })}
      method="POST"
    >
      <Button type="submit">Delete</Button>
    </form>
  );
}
