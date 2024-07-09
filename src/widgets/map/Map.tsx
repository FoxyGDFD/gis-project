import { defaultDeckGlConfig } from "@/shared/configs";
import { createBaseMapTile, createEditableLayer } from "@/shared/deck";
import { useEditMapStore } from "@/shared/store/edit";
import { useMapStore } from "@/shared/store/map";
import {
  EditableGeoJsonLayer,
  ViewMode,
} from "@deck.gl-community/editable-layers";
import { PickingInfo, ViewStateChangeParameters } from "@deck.gl/core";
import { TileLayer } from "@deck.gl/geo-layers";
import DeckGL, { DeckGLRef } from "@deck.gl/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Overlay } from "./Overlay";
import { useExportMapStore } from "@/shared/store/export";
import { saveMap } from "@/shared/utils";

type CursorState = {
  /** Whether the cursor is over a pickable object */
  isHovering: boolean;
  /** Whether the cursor is down */
  isDragging: boolean;
};

const getCursor = (state: CursorState) => {
  const { editMode, measureMode } = useEditMapStore.getState();

  if (!(measureMode instanceof ViewMode) || !(editMode instanceof ViewMode)) {
    return "crosshair";
  }

  if (state.isDragging) {
    return "grab";
  }

  if (state.isHovering) {
    return "pointer";
  }

  return "grab";
};

export const Map = () => {
  const [baseMapTile, setBaseMapTile] = useState<TileLayer>();
  const mapStore = useMapStore();

  useEffect(() => {
    const baseTile = createBaseMapTile(
      mapStore.baseMapTile,
      mapStore.coordinateSystem,
    );
    setBaseMapTile(baseTile);
  }, [mapStore.baseMapTile, mapStore.coordinateSystem]);

  const onViewStateChange = useCallback(
    ({ viewState }: ViewStateChangeParameters) =>
      mapStore.setViewState(viewState),
    [mapStore.setViewState],
  );

  // EDIT
  const [pickingInfo, setPickingInfo] = useState<PickingInfo | null>(null);
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState<
    number[]
  >([]);

  const edit = useEditMapStore();
  const [editableLayer, setEditableLayer] =
    useState<EditableGeoJsonLayer | null>();

  useEffect(() => {
    if (edit?.editableLayer) {
      const editableLayer = createEditableLayer({
        data: edit.editableLayer,
        editMode: edit.editMode,
        selectedFeatureIndexes,
        setSelectedFeatureIndexes,
        setPickingInfo,
      });

      setEditableLayer(editableLayer);
    } else {
      setEditableLayer(null);
    }
  }, [edit.editableLayer, edit.editMode, selectedFeatureIndexes]);

  useEffect(() => {
    if (!edit.editableLayer) {
      setSelectedFeatureIndexes([]);
    }
  }, [edit.editableLayer, edit.editMode]);

  useEffect(() => {
    setPickingInfo(null);
  }, [edit.editMode]);

  const mapRef = useRef<DeckGLRef>(null);

  const { setScreening, isScreening, type } = useExportMapStore();

  console.log(type);

  const onAfterRender = () => {
    if (isScreening && type) {
      saveMap(mapRef.current?.deck?.getCanvas() as HTMLCanvasElement, type);
      setScreening(false);
    }
  };

  return (
    <DeckGL
      ref={mapRef}
      onAfterRender={onAfterRender}
      
      {...defaultDeckGlConfig}
      layers={[baseMapTile, mapStore.layers, editableLayer]}
      viewState={mapStore.viewState}
      onViewStateChange={onViewStateChange}
      onClick={(pickingInfo: PickingInfo) => {
        if (
          !pickingInfo.object ||
          !(edit.measureMode instanceof ViewMode) ||
          !(edit.editMode instanceof ViewMode)
        ) {
          setPickingInfo(null);
          return;
        }
        setPickingInfo(pickingInfo as PickingInfo);
      }}
      getCursor={getCursor}
      
    >
      {!!pickingInfo?.object && (
        <Overlay {...pickingInfo} setPickingInfo={setPickingInfo} />
      )}
    </DeckGL>
  );
}