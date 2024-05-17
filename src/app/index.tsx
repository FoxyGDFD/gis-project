import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import "./index.css";

export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(<RouterProvider router={router} />);
