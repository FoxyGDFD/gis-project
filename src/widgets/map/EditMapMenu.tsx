import { drawModes, transformModes } from "@/shared/data";
import { useEditMapStore } from "@/shared/store/edit";
import { useMapStore } from "@/shared/store/map";
import { ViewMode } from "@deck.gl-community/editable-layers";
import { ExitIcon } from "@radix-ui/react-icons";
import * as Toggle from "@radix-ui/react-toggle";
import { FiSave } from "react-icons/fi";
import { toast } from "sonner";

export const EditMapMenu = () => {
  const editStore = useEditMapStore();

  if (!editStore.editableLayer) return null;

  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[1]">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 bg-base-100 rounded shadow-md p-2">
          {drawModes.map((drawMode, index) => (
            <Toggle.Root
              key={index}
              asChild
              pressed={drawMode.mode === editStore.editMode}
              onPressedChange={() => {
                if (drawMode.mode === editStore.editMode) {
                  editStore.setEditMode(new ViewMode());
                  return;
                }
                editStore.setMeasureMode(new ViewMode());
                editStore.setEditMode(drawMode.mode);
              }}
            >
              <button className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start data-[state=on]:bg-base-300">
                {<drawMode.icon className="w-4 h-4" />}
              </button>
            </Toggle.Root>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 bg-base-100 rounded shadow-md p-2">
          {transformModes.map((transformMode, index) => (
            <Toggle.Root
              key={index}
              asChild
              pressed={transformMode.mode === editStore.editMode}
              onPressedChange={() => {
                if (transformMode.mode === editStore.editMode) {
                  editStore.setEditMode(new ViewMode());
                  return;
                }
                editStore.setMeasureMode(new ViewMode());
                editStore.setEditMode(transformMode.mode);
              }}
            >
              <button className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start data-[state=on]:bg-base-300">
                {<transformMode.icon className="w-4 h-4" />}
              </button>
            </Toggle.Root>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 bg-base-100 rounded shadow-md p-2">
          <button
            className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
            onClick={() => {
              useMapStore.getState().updateLayerData(editStore.editableLayer!);
              toast.success("Слой успешно сохранен")
            }}
          >
            <FiSave className="w-4 h-4" />{" "}
          </button>
          <button
            className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
            onClick={() => {
              useMapStore.getState().showLayer(editStore.editableLayer!.id);
              useEditMapStore.getState().resetState();
            }}
          >
            <ExitIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
