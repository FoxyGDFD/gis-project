import { BaseTile, DeckLayer, EditableLayer } from "@/shared/types";
import { MapViewState, View } from "@deck.gl/core";
import { BitmapLayerProps } from "@deck.gl/layers";

export type MapStoreVariables = {
  baseMapTile: BaseTile;
  coordinateSystem: BitmapLayerProps["coordinateSystem"];
  layers: DeckLayer[];
  view: View;
  viewState: MapViewState;
};
export type MapStoreMethods = {
  setBaseMapTile: (baseMapTile: BaseTile) => void;
  addLayer: (layer: DeckLayer) => void;
  setLayers: (layers: DeckLayer[]) => void;
  removeLayer: (id: string) => void;
  flyToLayer: (id: string) => void;
  showLayer: (id: string) => void;
  hideLayer: (id: string) => void;
  setViewState: (viewState: MapViewState) => void;
  updateLayerData: (editableLayer: EditableLayer) => void;
};

export type MapStoreState = MapStoreVariables & MapStoreMethods;
