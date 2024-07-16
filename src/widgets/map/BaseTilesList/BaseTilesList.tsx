import { baseTiles } from "@/shared/data";
import { useMapStore } from "@/shared/store/map";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { BaseTile } from "@/shared/types";
import { BaseTileItem } from "./ui";

export const BaseTilesList = () => {
  const [opened, setOpened] = useState(false);
  const mapStore = useMapStore();

  const changeTile = (value: string) =>
    mapStore.setBaseMapTile(
      baseTiles.find((tile) => tile.id === value) as BaseTile
    )

  return (
    <DropdownMenu.Root open={opened} onOpenChange={setOpened}>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 100,
          transition: {
            delayChildren: 0.3,
          },
        }}
        className="absolute select-none right-5 top-5 w-auto h-auto z-[1]"
      >
        <div className="card !rounded w-[300px] bg-base-100 shadow-xl p-2 relative">
          <DropdownMenu.Trigger asChild>
            <div className="flex justify-between items-center">
              <h6>Список базовых карт</h6>
              <MdOutlineKeyboardArrowDown />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="bg-base-100 !w-[300px] mt-3 rounded p-2"
            asChild
          >
            <motion.div
              initial={{ y: -30, opacity: 0, height: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                height: "auto",
              }}
            >
              <ScrollArea.Root className="overflow-hidden">
                <ScrollArea.Viewport>
                  <ToggleGroup.Root
                    value={mapStore.baseMapTile.id}
                    onValueChange={changeTile}
                    type="single"
                    className="w-full h-full flex flex-col gap-3"
                    asChild
                  >
                    <motion.div>
                      {baseTiles.map((baseTile, index) => <BaseTileItem key={index} index={index} {...baseTile} />)}
                    </motion.div>
                  </ToggleGroup.Root>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex select-none touch-none bg-gray-300 w-[6px] rounded overflow-hidden"
                >
                  <ScrollArea.Thumb className="bg-gray-600 flex-1 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </motion.div>
          </DropdownMenu.Content>
        </div>
      </motion.div>
    </DropdownMenu.Root>
  );
};
