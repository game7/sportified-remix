import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Host" }];

export default function HostIndex() {
  return (
    <div>
      <div>Host!</div>
    </div>
  );
}
