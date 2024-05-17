import { EditMapMenu, Map, Menu } from "@/widgets/map";
import { Timelines } from "@/widgets/map/Timelines";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <>
      <EditMapMenu />
      <Menu />
      <Map />
      <Timelines />
    </>
  );
}
