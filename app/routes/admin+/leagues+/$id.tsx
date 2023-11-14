import { Button, Stack } from "@mantine/core";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { PageHeader } from "~/components/page-header";
import { app } from "~/models/app.server";
import { currentTenant } from "~/services/tenant.server";
import { paths } from "~/util/paths";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const tenant = await currentTenant(request);
  const leagueId = z.coerce.number().parse(params.id);
  console.log("---", { leagueId });
  return {
    league: await app.leagues.find(leagueId),
    seasons: await app.seasons.list({
      tenantId: tenant.id,
      leagueId: leagueId,
    }),
  };
}

export default function LeaguesShow() {
  const { league, seasons } = useLoaderData<typeof loader>();

  return (
    <Stack style={{ maxWidth: 960 }}>
      <PageHeader
        title={league.name}
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
    </Stack>
  );
}
