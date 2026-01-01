import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(layout)/(login)/login")({
  component: Login,
});

function Login() {
  return <div>fodase</div>;
}
