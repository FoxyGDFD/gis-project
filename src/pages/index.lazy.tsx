import { EditMapMenu, Map, Menu } from "@/widgets/map";
import { BaseTilesList } from "@/widgets/map/BaseTilesList";
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
      <BaseTilesList />
    </>
  );
}
