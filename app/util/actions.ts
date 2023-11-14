import { type ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import _ from "lodash";
import { ZodError } from "zod";

export async function formAction<Shape = unknown>(
  request: Request,
  handler: (data: Shape) => ReturnType<ActionFunction>
) {
  const formData = await request.formData();
  const data = formData.has("data")
    ? (JSON.parse(_.toString(formData.get("data"))) as Shape)
    : (Object.fromEntries(await request.formData()) as Shape);
  try {
    return await handler(data);
  } catch (e) {
    if (e instanceof ZodError) {
      return formActionError<Shape>({ input: data, error: e });
    }
  }
}

function formActionError<Shape = unknown>({
  input,
  error,
}: {
  input: Shape;
  error: ZodError<Shape>;
}) {
  return {
    input,
    errors: error.flatten(),
  };
}

export function useActionError<Shape>() {
  const data = (useActionData() as object) || {};
  if (Object.hasOwn(data, "input") && Object.hasOwn(data, "errors")) {
    return data as ReturnType<typeof formActionError<Shape>>;
  }
  return null;
}
