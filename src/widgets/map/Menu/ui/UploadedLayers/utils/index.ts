import { createVectorLayer } from "@/shared/deck";
import { useMapStore } from "@/shared/store/map";
import { useUploadStore } from "@/shared/store/upload/useUploadStore";

export const showLayer = (id: string, onSuccess?: () => void) => {
  const { uploadedLayers } = useUploadStore.getState();
  const { layers, showLayer: show, addLayer } = useMapStore.getState();

  if (layers.find((l) => l.id === id)) {
    show(id);
    if (onSuccess instanceof Function) onSuccess?.();
    return;
  }

  console.log(uploadedLayers, id);
  const uploadedLayer = uploadedLayers.find((l) => l.id === id);
  const deckLayer = createVectorLayer(id, uploadedLayer?.layer as any);

  addLayer(deckLayer);
  if (onSuccess instanceof Function) onSuccess?.();
};