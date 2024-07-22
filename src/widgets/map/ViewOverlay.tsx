import { VectorLayer } from "@/shared/deck";
import { useMapStore } from "@/shared/store/map";
import { PickingInfo } from "@deck.gl/core";
import { VectorViewOverlayStorage } from "./VectorViewOverlayStorage";

type VectorViewOverlayProps = PickingInfo;

export const VectorViewOverlay = (props: VectorViewOverlayProps) => {
  const { layers } = useMapStore();
  const layer = layers.find((l) => l.id === props.layer?.props.layerId);

  return (
    <div className="flex flex-col gap-2">
      <h6 className="max-w-[90%]">Карточка объекта</h6>
      <VectorViewOverlayStorage
        layer={layer as VectorLayer}
        featureId={props.object.id}
        featureType={props.object.geometry.type}
      />
    </div>
  );
};
