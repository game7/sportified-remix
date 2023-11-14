import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { PageHeader } from "~/components/page-header";
import { app, type App } from "~/models/app.server";
import { currentTenant } from "~/services/tenant.server";
import { formAction, useActionError } from "~/util/actions";
import { paths } from "~/util/paths";

type CreateFunction = App["Leagues"]["create"];
type CreateData = Parameters<CreateFunction>[1];
const model = app.leagues;
const modelName = "Leagues";

export async function action({ request }: ActionFunctionArgs) {
  const tenant = await currentTenant(request);

  return formAction<CreateData>(request, async (data) => {
    const league = await model.create(tenant.id, data);
    return redirect(paths["/admin/leagues/:id"]({ id: league.id.toString() }));
  });
}

export default function LeaguesNew() {
  const error = useActionError<CreateData>();

  const form = useForm<CreateData>({
    initialValues: error?.input || { name: "" },
    initialErrors: error?.errors.fieldErrors,
  });

  return (
    <Stack style={{ maxWidth: 960 }}>
      <PageHeader title={`New ${modelName}`} />
      <form
        onSubmit={form.onSubmit((_values, event) => {
          event?.currentTarget.submit();
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
        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  );
}
