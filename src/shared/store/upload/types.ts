import { FeatureCollection } from "@deck.gl-community/editable-layers";

export type UploadStoreVariables = {
  uploadedLayers: {
    id: string;
    file: {
      name: string;
      size: number;
      type: string;
    };
    layer: FeatureCollection;
  }[];
};
export type UploadStoreMethods = {
  addUploadedLayerInfo: (
    file: {
      name: string;
      size: number;
      type: string;
    },
    layer: FeatureCollection,
  ) => void;

  removeUploadedLayer: (id: string) => void;

  exportLayer: (id: string) => void;
  setLayerFC: (id: string, layer: FeatureCollection) => void;

  reset: () => void;
};

export type UploadStoreState = UploadStoreVariables & UploadStoreMethods;
