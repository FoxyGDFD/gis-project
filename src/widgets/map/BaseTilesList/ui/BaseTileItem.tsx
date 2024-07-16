import { BaseTile } from "@/shared/types";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { motion } from "framer-motion";
import { FC } from "react";

interface BaseTileItemProps extends BaseTile {
    index: number;
}

export const BaseTileItem: FC<BaseTileItemProps> = ({ id, index, title, src }) => {
    return (
        <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{
            x: 0,
            opacity: 1,
            transition: { delay: 0.07 * index },
            }}
        >
            <ToggleGroup.Item
                value={id}
                className="w-full flex items-center gap-3 px-3 rounded py-2 data-[state=on]:bg-base-300 data-[state=on]:shadow-md"
            >
            <img
                className="w-12 h-12 rounded-md object-cover"
                src={src}
            />
            {title}
            </ToggleGroup.Item>
        </motion.div>
    )
}