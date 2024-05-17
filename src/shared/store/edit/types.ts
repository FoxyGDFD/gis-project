import { EditableLayer } from '@/shared/types';
import { GeoJsonEditMode } from '@deck.gl-community/editable-layers';

export type EditMapStoreVariables = {
  editableLayer: EditableLayer | null;

  measureMode: GeoJsonEditMode;
  editMode: GeoJsonEditMode;
};
export type EditMapStoreMethods = {
  setEditableLayer: (layer: EditableLayer) => void;

  setPropertiesToFeature: (
    featureId: number,
    properties: Record<string, any>
  ) => void;

  setEditMode: (mode: GeoJsonEditMode) => void;
  setMeasureMode: (mode: GeoJsonEditMode) => void;

  resetState: () => void;
};

export type EditMapStoreState = EditMapStoreVariables & EditMapStoreMethods;