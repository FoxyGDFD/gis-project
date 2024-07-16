import { EditMapMenu, Map, Menu } from "@/widgets/map";
import { BaseTilesList } from "@/widgets/map/BaseTilesList";
import { createLazyFileRoute } from "@tanstack/react-router";
import * as Dialog from '@radix-ui/react-dialog';
import { ExportDialog } from "@/widgets/map/Menu/ui";

export const Route = createLazyFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <Dialog.Root>
      <EditMapMenu />
      <Menu />
      <Map />
      <BaseTilesList />
      <ExportDialog />
    </Dialog.Root>
  );
}
