import { AppShell, Burger, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "@remix-run/react";
import { IconBuilding, IconHome } from "@tabler/icons-react";
import { paths } from "~/util/paths";

export default function HostLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Host</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label="Home"
          leftSection={<IconHome />}
          href={paths["/host"]({})}
          aria-label="Home"
        />
        <NavLink
          label="Tenants"
          leftSection={<IconBuilding />}
          href={paths["/host/tenants"]({})}
          aria-label="Tenants"
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
