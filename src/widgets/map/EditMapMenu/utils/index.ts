import { useEditMapStore } from "@/shared/store/edit";
import { GeoJsonEditMode, ViewMode } from "@deck.gl-community/editable-layers";

export const onPressedChange = <T extends GeoJsonEditMode>(mode: T) => () => {
	const { editMode, setEditMode, setMeasureMode } = useEditMapStore.getState();
	if (mode === editMode) {
		setEditMode(new ViewMode());
		return;
	}
	setMeasureMode(new ViewMode());
	setEditMode(mode);
}