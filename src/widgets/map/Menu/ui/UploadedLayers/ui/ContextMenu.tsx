import { FC } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { motion } from "framer-motion";
import { useMapStore } from "@/shared/store/map";
import { EditableLayer } from "@/shared/types";
import { BiExport, BiRename } from "react-icons/bi";
import { PiPencil } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { useEditMapStore } from "@/shared/store/edit";
import { useUploadStore } from "@/shared/store/upload/useUploadStore";
import { EditableLayerItem } from "../types";
import { showLayer } from "../utils";

export const EditLayerContextMenu: FC<EditableLayerItem> = props => {
	const { removeUploadedLayer, exportLayer, setEditingNameLayer } = useUploadStore();
  const { layers, flyToLayer, hideLayer } = useMapStore();
	const { setEditableLayer, editableLayer, resetState } = useEditMapStore();

  const onEdit = (id: string, lr: Omit<EditableLayer, "featureCollection">) => {
    showLayer(id, () => {
      const layer = layers.find((layer) => layer.id === id);

      if (!layer) return;

      const featureCollection = layer.props.getFeatureCollection();
      setEditableLayer({ ...lr, featureCollection });

      flyToLayer(id);
      hideLayer(id);
    });
  };
  const onStopEdit = (id: string) => {
    resetState();
    showLayer(id);
  };

	const onClickEditButton = () => {
		editableLayer?.id === props.id
			? onStopEdit(props.id!)
			: onEdit(props.id as string, props)
	}
	
	return (
		<ContextMenu.Content asChild>
			<motion.div
				initial={{ x: -20, y: -20, opacity: 0 }}
				animate={{
					x: 0,
					y: 0,
					opacity: 100,
				}}
				className="flex flex-col gap-2 p-2 rounded bg-base-300 shadow-md select-none z-20"
			>
				<button
					className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
					onClick={onClickEditButton}>
					<PiPencil className="w-4 h-4" />
					{editableLayer?.id === props.id ? (
						<p>Выйти из режима редактирования</p>
					) : (
						<p>Редактировать</p>
					)}
				</button>
				<button
					className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
					onClick={() => setEditingNameLayer(props.id)}>
					<BiRename className="w-4 h-4" />
					Переименовать слой
				</button>
				<button
					className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
					onClick={() => exportLayer(props.id)}
				>
					<BiExport className="w-4 h-4" />
					<p>Экспортировать слой</p>
				</button>
				<button
					className="btn btn-ghost btn-xs p-[2px] rounded flex items-center justify-start"
					onClick={() => removeUploadedLayer(props.id)}
				>
					<RxCross1 className="w-4 h-4 text-red-500" />
					<p>Удалить слой</p>
				</button>
			</motion.div>
		</ContextMenu.Content>
	);
}