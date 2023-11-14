import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Admin" }];

export default function AdminIndex() {
  return (
    <div>
      <div>Admin!</div>
    </div>
  );
}
