import {
  CommonFCWithProperties,
  CommonLayerFeatureProperties,
} from "@/shared/types";
import { hexToRgbaArray } from "@/shared/utils";
import { GeoJsonLayer, PathLayer, PolygonLayer } from "@deck.gl/layers";
import { bbox, centroid } from "@turf/turf";
import { FeatureCollection } from "geojson";
import { DEFAULT_COLORS, DEFAULT_SIZES } from "../data";
import { CommonLayerMethods, CommonLayerVariables } from "./common";
import { DataFilterExtension } from "@deck.gl/extensions";

export class VectorLayer extends GeoJsonLayer<
  any,
  CommonLayerMethods<CommonFCWithProperties, CommonFCWithProperties> &
    CommonLayerVariables
> {}

export const createVectorLayer = (id: string, data: CommonFCWithProperties) => {
  data.features = data.features || [];

  return new VectorLayer({
    id: id,
    data,
    layerId: id,

    getFilterValue: (d) => d.properties.date || 0,
    filterRange: [0, 2040],
    filterSoftRange: [0, 10],
    extensions: [new DataFilterExtension({ filterSize: 1 })],

    // -------- DEFAULT PROPS --------

    visible: true,
    pickable: true,

    // -------- COMMON METHODS --------

    getFeatures() {
      return (this.data as CommonFCWithProperties).features;
    },

    getFeatureCollection() {
      return this.data as CommonFCWithProperties;
    },

    getLayerBounds() {
      return bbox(this.data);
    },

    getType() {
      return LayerType.VECTOR;
    },

    getName() {
      return this.name || "";
    },

    getData() {
      return this.data as CommonFCWithProperties;
    },

    getCenter() {
      return centroid(this.getData!() as FeatureCollection)?.geometry
        .coordinates;
    },

    getProperties(featureId: number) {
      return (
        (this.data as FeatureCollection).features?.find(
          (f) => f.id === featureId
        )?.properties || {}
      );
    },

    // -------- STYLES --------
    _subLayerProps: {
      "polygons-stroke": {
        type: PathLayer,
        getColor: (feature: any) => {
          const properties: CommonLayerFeatureProperties =
            feature.__source?.object?.properties;

          if (properties?.stroke) {
            return hexToRgbaArray(properties.stroke);
          } else {
            return DEFAULT_COLORS.EDIT.GEOJSON.LINE;
          }
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
          if (feature.properties.fill) {
            return hexToRgbaArray(feature.properties.fill);
          } else {
            return DEFAULT_COLORS.EDIT.GEOJSON.FILL;
          }
        },
        getLineColor: (feature: CommonFCWithProperties["features"][0]) => {
          if (feature.properties.stroke) {
            return hexToRgbaArray(feature.properties.stroke);
          } else {
            return DEFAULT_COLORS.EDIT.GEOJSON.LINE;
          }
        },
        getLineWidth: (feature: CommonFCWithProperties["features"][0]) => {
          if (feature.properties["stroke-width"]) {
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

          if (properties?.stroke) {
            return hexToRgbaArray(properties.stroke);
          } else {
            return DEFAULT_COLORS.EDIT.GEOJSON.LINE;
          }
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
  });
};
