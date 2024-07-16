import { useEditMapStore } from "@/shared/store/edit";
import { useMapStore } from "@/shared/store/map";
import { ExitIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { FiSave } from "react-icons/fi";
import { toast } from "sonner";
import * as Tooltip from "@radix-ui/react-tooltip";


export const SaveExitEditMode: FC = () => {
  const { resetState, editableLayer } = useEditMapStore();
  const { updateLayerData, showLayer } = useMapStore();

  const saveAndExit = () => {
    updateLayerData(editableLayer!);
    toast.success("Слой успешно сохранен");
  }

  const resetAndExit = () => {
    showLayer(editableLayer!.id);
    resetState();
}

  return (
	<div className="grid grid-cols-2 gap-2 p-2">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<button
					className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
					onClick={saveAndExit}
				>
					<FiSave className="w-4 h-4" />
				</button>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content className="TooltipContent z-20 bg-base-200 py-[2px] px-1 rounded" sideOffset={5}>
					<p className="text-sm text-stone-400">Сохранить</p>
				</Tooltip.Content>
				</Tooltip.Portal>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<button
					className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
					onClick={resetAndExit}
				>
					<ExitIcon className="w-4 h-4" />
				</button>
			</Tooltip.Trigger>
			<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent z-20 bg-base-200 py-[2px] px-1 rounded" sideOffset={5}>
						<p className="text-sm text-stone-400">Выйти без изменений</p>
					</Tooltip.Content>
				</Tooltip.Portal>
		</Tooltip.Root>
	</div>
  )   
}