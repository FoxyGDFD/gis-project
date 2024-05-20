import { baseTiles } from "@/shared/data";
import { useMapStore } from "@/shared/store/map";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { BaseTile } from "@/shared/types";

export const BaseTilesList = () => {
  const [opened, setOpened] = useState(false);
  const mapStore = useMapStore();

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
                    onValueChange={(value) =>
                      mapStore.setBaseMapTile(
                        baseTiles.find((tile) => tile.id === value) as BaseTile
                      )
                    }
                    type="single"
                    className="w-full h-full flex flex-col gap-3"
                    asChild
                  >
                    <motion.div>
                      {baseTiles.map((baseTile, index) => (
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            transition: { delay: 0.07 * index },
                          }}
                        >
                          <ToggleGroup.Item
                            key={baseTile.id}
                            value={baseTile.id}
                            className="w-full flex items-center gap-3 px-3 rounded py-2 data-[state=on]:bg-base-300 data-[state=on]:shadow-md"
                          >
                            <img
                              className="w-12 h-12 rounded-md object-cover"
                              src={baseTile.src}
                            />
                            {baseTile.title}
                          </ToggleGroup.Item>
                        </motion.div>
                      ))}
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
