import { motion } from "framer-motion";
import { CreateEmptyLayer, UploadLayer } from "@/features/map";
import { FaPlus } from "react-icons/fa6";
import { cx } from "class-variance-authority";
import * as Toggle from "@radix-ui/react-toggle";
import { useState } from "react";
import { UploadedLayers } from "./UploadedLayers";

export const Menu = () => {
  const [pressed, setPressed] = useState(false);

  return (
    // <Rnd
    //   default={{ x: 30, y: 30, width: "auto", height: "auto" }}
    //   enableResizing={false}
    //   className="z-[1]"
    // >
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 100,
        transition: {
          delayChildren: 0.3,
        },
      }}
      className="absolute left-5 top-5 w-auto h-auto z-[1]"
    >
      <div className="card w-[300px] bg-base-100 shadow-xl p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="prose-2xl font-bold text-white">Меню</h2>
            <Toggle.Root asChild pressed={pressed} onPressedChange={setPressed}>
              <button className="btn btn-ghost btn-sm">
                <FaPlus
                  className={cx(
                    "w-5 h-5 transition-all duration-150",
                    pressed && "-rotate-45",
                  )}
                />
              </button>
            </Toggle.Root>
          </div>
          {pressed && (
            <>
              <div className="flex flex-col gap-2">
                <CreateEmptyLayer />
                <UploadLayer />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 100, x: 0, transition: { delay: 0.2 } }}
                className="divider m-0 h-[2px]"
              ></motion.div>
            </>
          )}
          <UploadedLayers />
        </div>
      </div>
    </motion.div>
  );
};
