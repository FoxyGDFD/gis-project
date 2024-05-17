import { VectorLayer } from "@/shared/deck";
import { useMapStore } from "@/shared/store/map";
import { PickingInfo } from "@deck.gl/core";
import { VectorEditOverlayStorage } from "./VectorEditOverlayStorage";

type VectorEditOverlayProps = PickingInfo;

export const VectorEditOverlay = (props: VectorEditOverlayProps) => {
  const { layers } = useMapStore();
  const layer = layers.find((l) => l.id === props.layer?.props.layerId);

  return (
    <div className="flex flex-col gap-2">
      <h6 className="max-w-[90%]">Карточка объекта</h6>
      <VectorEditOverlayStorage
        layer={layer as VectorLayer}
        featureId={props.object.id}
      />
    </div>
  );
};
