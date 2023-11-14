import {
  Button,
  Group,
  Stack,
  TextInput,
  Text,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { IconTrash } from "@tabler/icons-react";
import { z } from "zod";
import { PageHeader } from "~/components/page-header";
import { app, type App } from "~/models/app.server";
import { currentTenant } from "~/services/tenant.server";
import { formAction, useActionError } from "~/util/actions";
import { paths } from "~/util/paths";

type CreateFunction = App["Seasons"]["create"];
type CreateData = Parameters<CreateFunction>[2];
const model = app.seasons;
const modelName = "Season";

export async function action({ request, params }: ActionFunctionArgs) {
  const tenant = await currentTenant(request);
  const leagueId = z.coerce.number().parse(params["leagueId"]);

  return formAction<CreateData>(request, async (data) => {
    const result = await model.create(tenant.id, leagueId, data);
    return redirect(
      paths["/admin/leagues/:id"]({
        id: leagueId.toString(),
      })
    );
  });
}

export default function LeagueSeasonsNew() {
  const error = useActionError<CreateData>();
  const fetcher = useFetcher();

  const form = useForm<CreateData>({
    initialValues: error?.input || { name: "", divisions: [] },
    initialErrors: error?.errors.fieldErrors,
  });

  const divisions = (form.values.divisions || []).map((item, index) => (
    <Group key={index} mt="xs">
      <TextInput
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`divisions.${index}.name`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("divisions", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  return (
    <Stack style={{ maxWidth: 960 }}>
      <PageHeader title={`New ${modelName}`} />
      <form
        onSubmit={form.onSubmit(async (values, event) => {
          function toFormData(data: any) {
            const formData = new FormData();
            formData.append("data", JSON.stringify(values));
            return formData;
          }

          const response = await fetcher.submit(toFormData(values), {
            method: "POST",
            navigate: false,
          });
          console.log(values, response);
          // event?.currentTarget.submit();
        })}
        method="post"
      >
        <TextInput
          {...form.getInputProps("name")}
          label="Name"
          name="name"
          style={{ width: 400 }}
          withAsterisk
        />
        {divisions?.length ? (
          <Group mb="xs">
            <Text fw={500} size="sm" style={{ flex: 1 }}>
              Name
            </Text>
            <Text fw={500} size="sm" pr={90}>
              Status
            </Text>
          </Group>
        ) : (
          <Text c="dimmed" ta="center">
            No one here...
          </Text>
        )}
        {divisions}
        <Group justify="center" mt="md">
          <Button
            onClick={() =>
              form.insertListItem("divisions", {
                name: "",
              })
            }
          >
            Add Division
          </Button>
        </Group>
        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  );
}
