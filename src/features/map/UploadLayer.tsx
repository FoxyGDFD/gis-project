import { ChangeEvent, useRef } from "react";
import { motion } from "framer-motion";
import * as gjv from "geojson-validation";
import { toast } from "sonner";
import { useUploadStore } from "@/shared/store/upload/useUploadStore";
import { FeatureCollection } from "@deck.gl-community/editable-layers";

export const UploadLayer = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) return;
      let obj = {};
      try {
        obj = JSON.parse(e.target.result);
      } catch {
        toast.error("Некорректный файл");
        return;
      }

      if (!gjv.valid(obj)) {
        toast.error("Некорректная структура файла");
      }

      useUploadStore.getState().addUploadedLayerInfo(
        {
          name: file.name,
          size: file.size,
          type: file.type,
        },
        obj as FeatureCollection,
      );

      toast.success("Слой успешно загружен");
    };

    reader.readAsText(file);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 100, x: 0, transition: { delay: 0.1 } }}
      >
        <button className="btn !rounded btn-outline btn-sm w-full" onClick={onClick}>
          Загрузить слой
        </button>
        <input ref={inputRef} type="file" hidden onChange={onUpload} />
      </motion.div>
    </>
  );
};
