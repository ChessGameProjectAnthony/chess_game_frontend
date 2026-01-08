import Navigator from "@/components/Navigator";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(layout)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-screen h-screen">
      <Navigator />
      <Outlet />
    </main>
  );
}
