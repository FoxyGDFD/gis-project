import { create } from "zustand";
import { MapStoreState, MapStoreVariables } from "./types";
import { baseTiles } from "@/shared/data";
import {
  COORDINATE_SYSTEM,
  FlyToInterpolator,
  WebMercatorViewport,
} from "@deck.gl/core";
import { toast } from "sonner";
import { defaultDeckGlConfig } from "@/shared/configs";
import { viewModes } from "@/shared/data/view-modes";
import { useUploadStore } from "../upload/useUploadStore";

const initialState: MapStoreVariables = {
  coordinateSystem: COORDINATE_SYSTEM.DEFAULT,
  viewState: defaultDeckGlConfig.initialViewState!,
  baseMapTile:
    baseTiles.find(
      (baseTile) =>
        baseTile.id.toString() === localStorage.getItem("base-map-tile-id"),
    ) || baseTiles[1],
  layers: [],
  view: viewModes[0].mode,
};

export const useMapStore = create<MapStoreState>()((set, get) => ({
  ...initialState,

  setBaseMapTile(baseMapTile) {
    localStorage.setItem("base-map-tile-id", baseMapTile.id);
    set({ baseMapTile });
  },

  addLayer(layer) {
    set({ layers: [...get().layers, layer] });
  },

  flyToLayer(id) {
    const layer = get().layers.find((layer) => layer.id === id);

    const bounds = layer?.props.getLayerBounds();

    if (bounds?.[0] === Infinity) {
      toast.info("Добавьте объекты в слой, чтобы переместиться к ним");
      return;
    }

    const [minLng, minLat, maxLng, maxLat] = bounds!;
    const viewport = new WebMercatorViewport(get().viewState);
    const { latitude, longitude, zoom } = viewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 70 },
    );

    get().setViewState({
      latitude,
      longitude,
      zoom,
      bearing: 0,
      pitch: 0,
      transitionDuration: 1300,
      transitionInterpolator: new FlyToInterpolator(),
    });
  },

  setLayers(layers) {
    set({ layers });
  },

  removeLayer(id) {
    set({ layers: get().layers.filter((layer) => layer.id !== id) });
  },

  showLayer(id) {
    const layer = get()
      .layers.find((layer) => layer.id === id)
      ?.clone({ visible: true });
    set({ layers: get().layers.map((l) => (l.id === layer.id ? layer : l)) });
  },

  hideLayer(id) {
    const layer = get()
      .layers.find((layer) => layer.id === id)
      ?.clone({ visible: false });
    set({ layers: get().layers.map((l) => (l.id === layer.id ? layer : l)) });
  },

  setViewState(viewState) {
    set({ viewState });
  },

  updateLayerData(editableLayer) {
    const layers = get().layers;
    const layer = layers.find((l) => l.id === editableLayer.id);

    if (!layer) return;

    const updatedLayerData = editableLayer.featureCollection;

    const updatedLayer = layer.clone({
      data: updatedLayerData as any,
      dataComparator: () => false,
    });

    layers[layers.findIndex((l) => l.id === editableLayer.id)] = updatedLayer;
    useMapStore.getState().setLayers(layers);
    useUploadStore.getState().setLayerFC(editableLayer.id, updatedLayerData);
  },
}));
