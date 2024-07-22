import { FC, useState } from "react"
import { EditableLayerItem } from "../types"
import { useEditMapStore } from "@/shared/store/edit";
import { useMapStore } from "@/shared/store/map";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { motion } from "framer-motion";
import { BiTargetLock } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { showLayer } from "../utils";
import { FaCheck } from "react-icons/fa6";
import { useUploadStore } from "@/shared/store/upload/useUploadStore";

export const UploadedLayer: FC<EditableLayerItem & { index: number}> = ({ id, index, layer, file }) => {
  const { layers, flyToLayer: fly, hideLayer } = useMapStore();

  const flyToLayer = (id: string) => {
    showLayer(id, () => {
      fly(id);
    });
  };

  const { editableLayer } = useEditMapStore();
	const { renameUploadedLayer, uploadedLayers } = useUploadStore();

  const [layerName, setName] = useState<string>(file.name);

	const changeLayerName = () => {
		renameUploadedLayer(id, layerName);
	}

	const { isEditingName } = uploadedLayers.find((l) => l.id === id) as EditableLayerItem & { isEditingName: boolean };

	return (
	<ContextMenu.Trigger asChild>
		<motion.div
			initial={{ x: -100, opacity: 0 }}
			animate={{
				x: 0,
				opacity: 100,
				transition: {
					delay: 0.07 * index,
				},
			}}
			className="card card-bordered w-full h-10 rounded shadow-xl border-accent px-2 relative"
		>
			{editableLayer?.id === id && (
					<div className="w-[5px] h-[5px] bg-orange-500 absolute left-[3px] bottom-[3px] rounded-full"></div>
			)}
			<div className="flex items-center w-full h-full justify-between gap-2">
				<div className="max-w-[60%] w-full">
					{isEditingName
						? <input className="prose-md overflow-hidden text-ellipsis outline-none bg-base-100" value={layerName} onChange={e => setName(e.target.value)} />
						: <h6 className="prose-md overflow-hidden text-ellipsis">
							{file.name}
						</h6>
					}
				</div>
				<div className="flex items-center gap-1">
					{isEditingName 
						? (
							<button
								className="btn btn-ghost btn-xs p-[2px] rounded"
								onClick={changeLayerName}
							>
								<FaCheck className="w-4 h-4" />
							</button>
						)
						: <>
							{layers.find((l) => l.id === id)?.props?.visible
								? (
									<button
										className="btn btn-ghost btn-xs p-[2px] rounded"
										onClick={() => hideLayer(id)}
									>
										<AiOutlineEye className="w-4 h-4" />
									</button>
								) : (
									<button
										className="btn btn-ghost btn-xs p-[2px] rounded"
										onClick={() => showLayer(id)}
									>
										<AiOutlineEyeInvisible className="w-4 h-4" />
								</button>
							)}
							<button
								className="btn btn-ghost btn-xs p-[2px] rounded"
								onClick={() => flyToLayer(id)}
							>
								<BiTargetLock className="w-4 h-4" />
							</button>
						</>
					}
				</div>
			</div>
		</motion.div>
	</ContextMenu.Trigger>
	)
}