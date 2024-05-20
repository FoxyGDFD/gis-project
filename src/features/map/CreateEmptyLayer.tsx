import { useUploadStore } from "@/shared/store/upload/useUploadStore";
import { motion } from "framer-motion";

export const CreateEmptyLayer = () => {
  const onAddEmptyLayer = () => {
    useUploadStore.getState().addUploadedLayerInfo(
      {
        name: "Пустой слой",
        size: 0,
        type: "application/json",
      },
      {
        type: "FeatureCollection",
        features: [],
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 100, x: 0 }}
    >
      <button
        className="btn !rounded btn-accent btn-sm w-full"
        onClick={onAddEmptyLayer}
      >
        Добавить пустой слой
      </button>
    </motion.div>
  );
};
