import { useEditMapStore } from "@/shared/store/edit";
import { useMapStore } from "@/shared/store/map";
import { PickingInfo } from "@deck.gl/core";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import { VectorViewOverlay } from "./ViewOverlay";
import { VectorEditOverlay } from "./EditOverlay";

type OverlayProps = PickingInfo & {
  setPickingInfo: Dispatch<SetStateAction<PickingInfo | null>>;
};

export const Overlay = ({ setPickingInfo, ...props }: OverlayProps) => {
  const onClose = () => {
    setPickingInfo(null);
  };

  const { layers } = useMapStore();
  const layer = layers.find((l) => l.id === props.layer?.props.layerId);

  return createPortal(
    <div
      className="absolute z-[1] px-3 py-2 -translate-x-1/2 translate-y-4"
      style={{ left: props.x, top: props.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-base-100 relative rounded w-full h-full min-w-[340px] min-h-[40px] flex flex-col gap-2 p-2">
        <button
          className="absolute right-2 top-2 btn btn-ghost btn-xs p-[2px] rounded self-end"
          onClick={onClose}
        >
          <Cross2Icon />
        </button>
        {layer && !useEditMapStore.getState().editableLayer && (
          <VectorViewOverlay {...props} />
        )}

        {layer && !!useEditMapStore.getState().editableLayer && (
          <VectorEditOverlay {...props} />
        )}
      </div>
    </div>,
    document.getElementById("root")!,
  );
};
