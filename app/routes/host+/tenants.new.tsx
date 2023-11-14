import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { tenants, type Tenants } from "~/models/tenant.server";
import { formAction, useActionError } from "~/util/actions";
import { paths } from "~/util/paths";

type CreateTenant = Tenants["create"];
type CreateTenantData = Parameters<CreateTenant>[0];

export async function action({ request }: ActionFunctionArgs) {
  return formAction<CreateTenantData>(request, async (data) => {
    await tenants.create(data);
    return redirect(paths["/host/tenants"]({}));
  });
}

export default function TenantsNew() {
  const error = useActionError<CreateTenantData>();

  const form = useForm<CreateTenantData>({
    initialValues: error?.input || { name: "" },
    initialErrors: error?.errors.fieldErrors,
  });

  return (
    <>
      <h2>New Tenant</h2>
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
          withAsterisk
        />
        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
}
