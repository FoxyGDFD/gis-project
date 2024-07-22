import { useUploadStore } from "@/shared/store/upload/useUploadStore";
import { IoTrash } from "react-icons/io5";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { EditLayerContextMenu, UploadedLayer } from "./ui";

export const UploadedLayers = () => {
  const { uploadedLayers, reset } = useUploadStore();

  if (!uploadedLayers.length) return null;

  return (
    <>
      <div className="flex flex-col gap-4 select-none p-3">
        <div className="flex justify-between items-center">
          <h3 className="prose-xl font-bold">Сохраненные слои</h3>
          <button className="btn btn-ghost btn-sm p-1">
            <IoTrash className="w-5 h-5 fill-red-500" onClick={() => reset()} />
          </button>
        </div>
        <div className="flex flex-col-reverse gap-2">
          {uploadedLayers.map((layer, index) => (
            <ContextMenu.Root key={layer.id}>
              <UploadedLayer {...layer}  index={index} />
              <EditLayerContextMenu {...layer} />
            </ContextMenu.Root>
          ))}
        </div>
      </div>
    </>
  );
};
