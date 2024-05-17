import { ViewMode } from "@deck.gl-community/editable-layers";
import { create } from "zustand";
import { EditMapStoreState, EditMapStoreVariables } from "./types";

const initialState: EditMapStoreVariables = {
  editableLayer: null,

  measureMode: new ViewMode(),
  editMode: new ViewMode(),
};

export const useEditMapStore = create<EditMapStoreState>()((set, get) => ({
  ...initialState,

  setEditableLayer(layer) {
    set({ editableLayer: { ...layer } });
  },

  setPropertiesToFeature(featureId, properties) {
    const editableLayer = get().editableLayer;
    if (!editableLayer) return;
    const featureIndex = editableLayer.featureCollection?.features.findIndex(
      (feature) => feature.id === featureId
    );
    const feature = {
      ...editableLayer.featureCollection?.features[featureIndex],
    };
    if (!feature) return;
    const newFeature = { ...feature, properties };
    const newFeatureCollection = {
      ...editableLayer.featureCollection,
      features: [
        ...editableLayer.featureCollection.features.map((f) =>
          f.id === featureId ? newFeature : f
        ),
      ],
    };
    const newEditableLayer = {
      ...editableLayer,
      featureCollection: newFeatureCollection,
    };
    set({ editableLayer: newEditableLayer });
  },

  setEditMode(mode) {
    set({ editMode: mode });
  },

  setMeasureMode(mode) {
    set({ measureMode: mode });
  },

  resetState() {
    set(initialState);
  },
}));
