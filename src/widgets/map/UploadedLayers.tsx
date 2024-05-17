import { createVectorLayer } from "@/shared/deck/vector";
import { useMapStore } from "@/shared/store/map";
import { useUploadStore } from "@/shared/store/upload/useUploadStore";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiExport, BiTargetLock } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { PiPencil } from "react-icons/pi";
import { useEditMapStore } from "@/shared/store/edit";
import { EditableLayer } from "@/shared/types";

export const UploadedLayers = () => {
  const { uploadedLayers, reset, removeUploadedLayer, exportLayer } =
    useUploadStore();
  const mapStore = useMapStore();

  const showLayer = (id: string, onSuccess?: () => void) => {
    if (mapStore.layers.find((l) => l.id === id)) {
      mapStore.showLayer(id);
      if (onSuccess instanceof Function) onSuccess?.();
      return;
    }

    const uploadedLayer = uploadedLayers.find((l) => l.id === id);
    const deckLayer = createVectorLayer(id, uploadedLayer?.layer as any);

    mapStore.addLayer(deckLayer);
    if (onSuccess instanceof Function) onSuccess?.();
  };

  const flyToLayer = (id: string) => {
    showLayer(id, () => {
      mapStore.flyToLayer(id);
    });
  };

  // EDIT
  const edit = useEditMapStore();
  const onEdit = (id: string, lr: Omit<EditableLayer, "featureCollection">) => {
    showLayer(id, () => {
      const layer = useMapStore
        .getState()
        .layers.find((layer) => layer.id === id);

      if (!layer) return;

      const featureCollection = layer.props.getFeatureCollection();

      useEditMapStore.getState().setEditableLayer({ ...lr, featureCollection });

      useMapStore.getState().flyToLayer(id);
      useMapStore.getState().hideLayer(id);
    });
  };
  const onStopEdit = (id: string) => {
    useEditMapStore.getState().resetState();
    useMapStore.getState().showLayer(id);
  };

  if (!uploadedLayers.length) return null;

  return (
    <>
      <div className="flex flex-col gap-4 select-none">
        <div className="flex justify-between items-center">
          <h3 className="prose-xl font-bold text-white">Сохраненные слои</h3>
          <button className="btn btn-ghost btn-sm p-1">
            <IoTrash className="w-5 h-5 fill-red-500" onClick={() => reset()} />
          </button>
        </div>
        {uploadedLayers.map((layer, index) => (
          <ContextMenu.Root key={layer.id}>
            <ContextMenu.Trigger asChild>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 100,
                  transition: {
                    delay: 0.07 * index,
                  },
                }}
                className="card card-bordered w-full h-10 rounded shadow-xl border-accent px-2 relative"
              >
                {edit.editableLayer?.id === layer.id && (
                  <div className="w-[5px] h-[5px] bg-orange-500 absolute left-[3px] bottom-[3px] rounded-full"></div>
                )}
                <div className="flex items-center w-full h-full justify-between gap-2">
                  <div className="max-w-[60%] w-full">
                    <h6 className="prose-md text-white overflow-hidden text-ellipsis">
                      {layer.file.name}
                    </h6>
                  </div>
                  <div className="flex items-center gap-1">
                    {mapStore.layers.find((l) => l.id === layer.id)?.props
                      ?.visible ? (
                      <button
                        className="btn btn-ghost btn-xs p-[2px] rounded"
                        onClick={() => mapStore.hideLayer(layer.id)}
                      >
                        <AiOutlineEye className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        className="btn btn-ghost btn-xs p-[2px] rounded"
                        onClick={() => showLayer(layer.id)}
                      >
                        <AiOutlineEyeInvisible className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      className="btn btn-ghost btn-xs p-[2px] rounded"
                      onClick={() => flyToLayer(layer.id)}
                    >
                      <BiTargetLock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </ContextMenu.Trigger>
            <ContextMenu.Content asChild>
              <motion.div
                initial={{ x: -20, y: -20, opacity: 0 }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: 100,
                }}
                className="flex flex-col gap-2 p-2 rounded bg-base-300 shadow-md select-none z-[2]"
              >
                <button
                  className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
                  onClick={() =>
                    edit.editableLayer?.id === layer.id
                      ? onStopEdit(layer.id)
                      : onEdit(layer.id, layer)
                  }
                >
                  <PiPencil className="w-4 h-4" />
                  {edit.editableLayer?.id === layer.id ? (
                    <p>Выйти из режима редактирования</p>
                  ) : (
                    <p>Редактировать</p>
                  )}
                </button>
                <button
                  className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
                  onClick={() => exportLayer(layer.id)}
                >
                  <BiExport className="w-4 h-4" />
                  <p>Экспортировать слой</p>
                </button>
                <button
                  className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
                  onClick={() => removeUploadedLayer(layer.id)}
                >
                  <RxCross1 className="w-4 h-4 text-red-500" />
                  <p>Удалить слой</p>
                </button>
              </motion.div>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
      </div>
    </>
  );
};
