import { Button, Stack } from "@mantine/core";
import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DataTable } from "mantine-datatable";
import { z } from "zod";
import { PageHeader } from "~/components/page-header";
import { app } from "~/models/app.server";
import { currentTenant } from "~/services/tenant.server";
import { paths } from "~/util/paths";

export const meta: MetaFunction = () => [{ title: "Tenants" }];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const tenant = await currentTenant(request);
  const leagueId = z.coerce.number().parse(params.leagueId);

  return {
    league: await app.leagues.find(leagueId),
    seasons: await app.seasons.list({ tenantId: tenant.id }),
  };
};

export default function LeagueSeasonsIndex() {
  const { league, seasons } = useLoaderData<typeof loader>();

  return (
    <Stack style={{ maxWidth: 960 }}>
      <PageHeader
        title="Seasons"
        actions={
          <>
            <Button
              component="a"
              href={paths["/admin/leagues/:leagueId/seasons/new"]({
                leagueId: league.id.toString(),
              })}
            >
              New Season
            </Button>
          </>
        }
      />

      <pre>{JSON.stringify(seasons, null, 2)}</pre>

      {/* <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        records={seasons}
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
      /> */}
    </Stack>
  );
}
