import { useMapStore } from "@/shared/store/map";
import { motion } from "framer-motion";

export const Timelines = () => {
  const mapStore = useMapStore();
  if (!mapStore.layers.length) return null;
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 100,
        transition: {
          delayChildren: 0.3,
        },
      }}
      className="absolute right-5 bottom-5 w-auto h-auto z-[1]"
    >
      <div className="card w-[300px] bg-base-100 shadow-xl p-4">
        {mapStore.layers.map((layer) => (
          <>privet</>
        ))}
      </div>
    </motion.div>
  );
};
