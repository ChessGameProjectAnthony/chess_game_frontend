import Navigator from "@/components/Navigator";
import useAuth from "@/stores/AuthStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(layout)")({
  component: RouteComponent,
  beforeLoad: () => {
    // if (!useAuth.getState().isUserLogged()) throw redirect({ to: "/" })
  }
});

function RouteComponent() {
  return (
    <main className="w-screen h-screen">
      <Navigator />
      <Outlet />
    </main>
  );
}
