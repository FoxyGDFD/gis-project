import { useEditMapStore } from "@/shared/store/edit";
import { SaveExitEditMode, TransformModes, CreationModes } from "./ui";
import * as Tooltip from '@radix-ui/react-tooltip';

export const EditMapMenu = () => {
  const { editableLayer } = useEditMapStore();

  if (!editableLayer) return null;

  return (
    <Tooltip.Provider>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-base-100 rounded shadow-md divide-y-[1px] divide-neutral">
            <CreationModes />
            <TransformModes />
            <SaveExitEditMode />
          </div>
        </div>
    </Tooltip.Provider>
  );
};
