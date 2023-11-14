import { AppShell, Burger, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { IconHome, IconTrophy } from "@tabler/icons-react";
import { currentTenant } from "~/services/tenant.server";
import { paths } from "~/util/paths";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const tenant = await currentTenant(request);

  return {
    tenant,
  };
};

export default function AdminLayout() {
  const { tenant } = useLoaderData<typeof loader>();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>({tenant.name})</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label="Home"
          leftSection={<IconHome />}
          href={paths["/admin"]({})}
          aria-label="Home"
        />
        <NavLink
          label="Leagues"
          leftSection={<IconTrophy />}
          href={paths["/admin/leagues"]({})}
          aria-label="Leagues"
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
