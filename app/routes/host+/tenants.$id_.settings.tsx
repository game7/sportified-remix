import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { tenants, type Tenants } from "~/models/tenant.server";
import { formAction, useActionError } from "~/util/actions";
import { paths } from "~/util/paths";

type UpdateTenant = Tenants["update"];
type UpdateTenantData = Parameters<UpdateTenant>[1];

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    tenant: await tenants.find(z.coerce.number().parse(params.id)),
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  return formAction<UpdateTenantData>(request, async (data) => {
    await tenants.update(z.coerce.number().parse(params.id), data);
    return redirect(paths["/host/tenants"]({}));
  });
}

export default function TenantsEdit() {
  const { tenant } = useLoaderData<typeof loader>();
  const error = useActionError<UpdateTenantData>();

  const form = useForm({
    initialValues: error?.input || tenant,
    initialErrors: error?.errors.fieldErrors,
  });

  return (
    <>
      <h2>Edit Tenant</h2>
      <Form
        onSubmit={form.onSubmit((_, event) => {
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
      </Form>
    </>
  );
}
