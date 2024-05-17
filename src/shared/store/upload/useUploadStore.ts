import { create } from "zustand";
import { UploadStoreState, UploadStoreVariables } from "./types";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useMapStore } from "../map";

const initialState: UploadStoreVariables = {
  uploadedLayers: [],
};

export const useUploadStore = create<UploadStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setLayerFC: (id, layer) => {
        const newLayers = get().uploadedLayers.map((l) =>
          l.id === id ? { ...l, layer } : l
        );
        set({ uploadedLayers: newLayers });
      },

      addUploadedLayerInfo(file, layer) {
        set({
          uploadedLayers: [
            ...get().uploadedLayers,
            {
              id: uuidv4(),
              file,
              layer,
            },
          ],
        });
      },

      reset() {
        set(initialState);
      },

      removeUploadedLayer(id: string) {
        set({
          uploadedLayers: get().uploadedLayers.filter(
            (layer) => layer.id !== id
          ),
        });
        useMapStore.getState().removeLayer(id);
      },

      exportLayer(id: string) {
        const uploadedLayer = get().uploadedLayers.find(
          (layer) => layer.id === id
        );

        if (!uploadedLayer) {
          toast.error("Произошла ошибка экспорта");
        }

        const element = document.createElement("a");
        const textFile = new Blob([JSON.stringify(uploadedLayer?.layer)], {
          type: uploadedLayer?.file?.type,
        });
        element.href = URL.createObjectURL(textFile);
        element.download = `${uploadedLayer?.file?.name}`;
        document.body.appendChild(element);
        element.click();
      },
    }),
    {
      name: "uploaded",
    }
  )
);
