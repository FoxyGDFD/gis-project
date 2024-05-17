import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <Toaster richColors className="z-[1]" position="top-center" />
      <Outlet />
    </>
  ),
});
