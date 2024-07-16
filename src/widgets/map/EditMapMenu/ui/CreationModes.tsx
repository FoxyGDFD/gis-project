import { FC } from "react";
import { createModes } from "@/shared/data";
import * as Toggle from "@radix-ui/react-toggle";
import { onPressedChange } from "../utils";
import { useEditMapStore } from "@/shared/store/edit";
import * as Tooltip from "@radix-ui/react-tooltip";

export const CreationModes: FC = () => {
  const { editMode } = useEditMapStore();

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {createModes.map((drawMode, index) => (
        <Tooltip.Root key={index}>
          <Toggle.Root
            asChild
            pressed={drawMode.mode === editMode}
            onPressedChange={onPressedChange(drawMode.mode)}
          >
            <Tooltip.Trigger asChild>
              <button className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start data-[state=on]:bg-base-300">
                {<drawMode.icon className="w-4 h-4" />}
              </button>
            </Tooltip.Trigger>
          </Toggle.Root>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent z-20 bg-base-200 py-[2px] px-1 rounded" sideOffset={5}>
              <p className="text-sm text-stone-400">{drawMode.name}</p>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      ))}
    </div>
  );
}