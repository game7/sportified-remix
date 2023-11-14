import { Button, Paper, Stack, Text } from "@mantine/core";
import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DataTable } from "mantine-datatable";
import { PageHeader } from "~/components/page-header";
import { leagues } from "~/models/leagues.server";
import { currentTenant } from "~/services/tenant.server";
import { paths } from "~/util/paths";
// import { db } from "~/db.server";

export const meta: MetaFunction = () => [{ title: "Tenants" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const tenant = await currentTenant(request);

  return {
    leagues: await leagues.list(tenant.id),
  };
};

export default function LeaguesIndex() {
  const { leagues } = useLoaderData<typeof loader>();

  return (
    <Stack style={{ maxWidth: 960 }}>
      <PageHeader
        title="Leagues"
        actions={
          <>
            <Button component="a" href={paths["/admin/leagues/new"]({})}>
              New League
            </Button>
          </>
        }
      />

      <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        records={leagues}
        noRecordsText="No leagues to show"
        minHeight={200}
        columns={[
          {
            accessor: "id",
          },
          {
            accessor: "name",
            render: (league) => (
              <a href={`/admin/leagues/${league.id}`}>{league.name}</a>
            ),
          },
        ]}
      />
    </Stack>
  );
}
