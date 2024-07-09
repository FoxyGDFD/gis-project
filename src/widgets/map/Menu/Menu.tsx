import { motion } from "framer-motion";
import { CreateEmptyLayer, ExportMapImage, UploadLayer } from "@/features/map";
import { FaPlus } from "react-icons/fa6";
import { cx } from "class-variance-authority";
import * as Toggle from "@radix-ui/react-toggle";
import { useState } from "react";
import { ExportDialog, UploadedLayers } from "./ui";

export const Menu = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 100,
        transition: {
          delayChildren: 0.3,
        },
      }}
      className="absolute left-5 top-5 w-auto h-auto z-10"
    >
      <div className="card !rounded w-[300px] bg-base-100 shadow-xl">
        <div className="space-y-2 divide-y-2 divide-neutral">
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="prose-2xl font-bold text-white">Меню</h2>
              <Toggle.Root asChild pressed={pressed} onPressedChange={setPressed}>
                <button className="btn btn-ghost btn-sm">
                  <FaPlus
                    className={cx(
                      "w-5 h-5 transition-all duration-150",
                      pressed && "-rotate-45"
                    )}
                  />
                </button>
              </Toggle.Root>
            </div>
            {pressed && (
                <div className="flex flex-col gap-2">
                  <CreateEmptyLayer />
                  <UploadLayer />
                  <ExportMapImage />
                </div>
            )}
          </div>
          <UploadedLayers />
        </div>
      </div>
    </motion.div>
  );
};
