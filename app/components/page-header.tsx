import { Group, Title } from "@mantine/core";
import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Title>{title}</Title>
      </div>
      <div>
        <Group gap="xs">{actions}</Group>
      </div>
    </div>
  );
}
