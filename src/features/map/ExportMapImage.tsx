import { motion } from "framer-motion";
import { FC } from "react";
import * as Dialog from '@radix-ui/react-dialog';

export const ExportMapImage: FC = () => {
    return (
        <Dialog.Trigger asChild>
            <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 100, x: 0, transition: { delay: 0.2 } }}
            >
            <button
                className="btn !rounded btn-accent btn-sm w-full"
            >
                Экспорт карты
            </button>
            </motion.div>
        </Dialog.Trigger>
      );
}