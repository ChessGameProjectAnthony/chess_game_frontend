import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => {
    if (true) {
      throw redirect({ to: '/home' })
    }
  }
});

function RouteComponent() {
  return <div className="text-[12rem]">top</div>;
}
