import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { tenants } from "~/models/tenant.server";
import { formAction } from "~/util/actions";
import { paths } from "~/util/paths";

export async function action({ request, params }: ActionFunctionArgs) {
  return formAction(request, async () => {
    await tenants.delete(z.coerce.number().parse(params.id));
    return redirect(paths["/host/tenants"]({}));
  });
}
