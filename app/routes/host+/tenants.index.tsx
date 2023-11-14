import { Stack } from "@mantine/core";
import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { DataTable } from "mantine-datatable";
import { Fragment } from "react";
import { tenants } from "~/models/tenant.server";
import { paths } from "~/util/paths";

export const meta: MetaFunction = () => [{ title: "Tenants" }];

export const loader = async () => {
  return json({
    tenants: await tenants.list(),
  });
};

export default function TenantsIndex() {
  const { tenants } = useLoaderData<typeof loader>();

  return (
    <div style={{ maxWidth: 960 }}>
      <Stack>
        <DataTable
          withTableBorder
          borderRadius="sm"
          withColumnBorders
          striped
          highlightOnHover
          records={tenants}
          columns={[
            {
              accessor: "id",
              width: "10%",
            },
            {
              accessor: "name",
              render: (tenant) => (
                <a href={`/host/tenants/${tenant.id}/edit`}>{tenant.name}</a>
              ),
            },
            {
              accessor: "actions",
              title: "Actions",
              render: (tenant) => (
                <Fragment>
                  <a
                    href={paths["/host/tenants/:id"]({
                      id: tenant.id.toString(),
                    })}
                  >
                    Show
                  </a>
                  {" | "}
                  <a
                    href={paths["/host/tenants/:id/settings"]({
                      id: tenant.id.toString(),
                    })}
                  >
                    Settings
                  </a>
                </Fragment>
              ),
            },
          ]}
        />
        <Link to={paths["/host/tenants/new"]({})}>Add New Tenant</Link>
      </Stack>
    </div>
  );
}
