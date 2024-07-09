import {
  CommonFCWithProperties,
  CommonLayerFeatureProperties,
  EditableLayer,
} from "@/shared/types";
import { hexToRgbaArray } from "@/shared/utils";
import {
  EditableGeoJsonLayer,
  GeoJsonEditMode,
  ViewMode,
} from "@deck.gl-community/editable-layers";
import { PathStyleExtension } from "@deck.gl/extensions";
import { PathLayer, PolygonLayer, ScatterplotLayer } from "@deck.gl/layers";
import { FeatureCollection } from "geojson";
import { Dispatch, SetStateAction } from "react";
import { DEFAULT_COLORS, DEFAULT_SIZES } from "../data";
import { useEditMapStore } from "../store/edit";
import { v4 } from "uuid";

type CreateEditableLayerProps = {
  setSelectedFeatureIndexes: Dispatch<SetStateAction<number[]>>;
  setPickingInfo: Dispatch<SetStateAction<any>>;
  selectedFeatureIndexes: number[];
  editMode: GeoJsonEditMode;
  data: EditableLayer;
};

export const createEditableLayer = (props: CreateEditableLayerProps) => {
  return new EditableGeoJsonLayer({
    id: `edit-${props.data.id?.toString()}`,
    layerId: props.data.id,

    data: props.data.featureCollection as any,
    selectedFeatureIndexes: props.selectedFeatureIndexes,
    mode: props.editMode,

    onEdit({ updatedData }) {
      useEditMapStore.getState().setEditableLayer({
        ...useEditMapStore.getState().editableLayer,
        featureCollection: {
          ...updatedData,
          features: updatedData.features.map((f) =>
            f.id
              ? f
              : {
                  ...f,
                  id: v4(),
                  properties: {
                    ...f.properties,
                  },
                }
          ),
        } as FeatureCollection,
      } as any);
    },

    onClick(pickingInfo) {
      if (props.editMode instanceof ViewMode) {
        props.setPickingInfo(pickingInfo);
      } else {
        props.setPickingInfo(null);
      }

      props.setSelectedFeatureIndexes([pickingInfo.index]);
    },

    pickable: true,
    highlightColor: DEFAULT_COLORS.EDIT.HIGHLIGHTED,

    _subLayerProps: {
      geojson: {
        _subLayerProps: {
          "polygons-stroke": {
            type: PathLayer,
            getColor: (feature: any) => {
              const properties: CommonLayerFeatureProperties =
                feature.__source?.object?.properties;

              const color =
                properties.stroke || DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

              const opacity =
                properties["stroke-opacity"] ||
                DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY;

              return hexToRgbaArray(color, opacity);
            },
            getWidth: (feature: any) => {
              const properties: CommonLayerFeatureProperties =
                feature.__source?.object?.properties;

              if (properties?.["stroke-width"]) {
                return +properties["stroke-width"];
              } else {
                return DEFAULT_SIZES.LINE_WIDTH;
              }
            },
          },
          "polygons-fill": {
            type: PolygonLayer,
            getFillColor: (feature: CommonFCWithProperties["features"][0]) => {
              const color =
                feature.properties?.fill ||
                DEFAULT_COLORS.EDIT.GEOJSON.FILL.COLOR;

              const opacity =
                feature.properties?.["fill-opacity"] ||
                DEFAULT_COLORS.EDIT.GEOJSON.FILL.OPACITY;

              return hexToRgbaArray(color, opacity);
            },
            getLineColor: (feature: CommonFCWithProperties["features"][0]) => {
              const color =
                feature.properties?.stroke ||
                DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

              const opacity =
                feature.properties?.["stroke-opacity"] ||
                DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY;

              return hexToRgbaArray(color, opacity);
            },
            getLineWidth: (feature: CommonFCWithProperties["features"][0]) => {
              if (feature.properties?.["stroke-width"]) {
                return +feature.properties["stroke-width"];
              } else {
                return DEFAULT_SIZES.LINE_WIDTH;
              }
            },
            lineWidthMaxPixels: 5,
            lineWidthMinPixels: 2,
          },
          linestrings: {
            type: PathLayer,
            widthMaxPixels: 5,
            widthMinPixels: 2,
            getColor: (feature: any) => {
              const properties: CommonLayerFeatureProperties =
                feature.__source?.object?.properties;

              const color =
                properties.stroke || DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

              const opacity =
                properties["stroke-opacity"] ||
                DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY;

              return hexToRgbaArray(color, opacity);
            },
            getWidth: (feature: any) => {
              const properties: CommonLayerFeatureProperties =
                feature.__source?.object?.properties;

              if (properties?.["stroke-width"]) {
                return +properties["stroke-width"];
              } else {
                return DEFAULT_SIZES.LINE_WIDTH;
              }
            },
          },
        },
      },
      guides: {
        pointType: "circle",
        extensions: [
          new PathStyleExtension({ dash: true, highPrecisionDash: false }),
        ],
        getDashArray: [5, 2],
        dashJustified: true,
        dashGapPickable: true,
        getFillColor: () => {
          return DEFAULT_COLORS.EDIT.GUIDES.FILL;
        },
        getLineColor: () => {
          return DEFAULT_COLORS.EDIT.GUIDES.LINE;
        },
        getLineWidth: DEFAULT_SIZES.LINE_WIDTH,
        _subLayerProps: {
          "points-circle": {
            type: ScatterplotLayer,
            radiusScale: 1,
            stroked: true,
            getLineWidth: 5,
            radiusMinPixels: 4,
            radiusMaxPixels: 6,
            getRadius: 4,
            getFillColor: () => {
              return [255, 255, 255];
            },
            getLineColor: DEFAULT_COLORS.EDIT.GUIDES.LINE,
          },
        },
      },
    },
  });
};
