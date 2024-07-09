import { FeatureCollection } from "@deck.gl-community/editable-layers";

export interface EditableLayerItem {
	id: string;
	file: {
		name: string;
		size: number;
		type: string;
	};
	layer: FeatureCollection;
}