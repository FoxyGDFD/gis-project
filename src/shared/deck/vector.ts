import {
  CommonFCWithProperties,
  CommonLayerFeatureProperties,
} from '@/shared/types';
import { hexToRgbaArray } from '@/shared/utils';
import {
  GeoJsonLayer,
  PathLayer,
  PolygonLayer,
  ScatterplotLayer,
} from '@deck.gl/layers';
import { bbox, centroid } from '@turf/turf';
import { FeatureCollection } from 'geojson';
import { CommonLayerMethods, CommonLayerVariables } from './common';
import { DEFAULT_COLORS, DEFAULT_SIZES } from '../data';

export class VectorLayer extends GeoJsonLayer<
  any,
  CommonLayerMethods<CommonFCWithProperties, CommonFCWithProperties> &
    CommonLayerVariables
> {}

export const createVectorLayer = (id: number, data: CommonFCWithProperties) => {
  data.features = data.features || [];

  return new VectorLayer({
    id: id.toString(),
    data,
    layerId: id,

    // -------- DEFAULT PROPS --------

    visible: true,
    pickable: true,
    autoHighlight: true,
    highlightColor(pickingInfo) {
      return DEFAULT_COLORS.HIGHLIGHT;
    },

    stroked: true,
    extruded: false,
    pointType: 'circle',

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
      return this.name || '';
    },

    getData() {
      return this.data as CommonFCWithProperties;
    },

    getCenter() {
      return centroid(this.getData!() as FeatureCollection)?.geometry
        .coordinates;
    },

    getProperties(featureId: string) {
      return (
        (this.data as FeatureCollection).features?.find(f => f.id === featureId)
          ?.properties || {}
      );
    },

    // -------- STYLES --------
    _subLayerProps: {
      'points-circle': {
        type: ScatterplotLayer,
        stroked: true,
        getRadius: (feature: any) => {
          const properties: CommonLayerFeatureProperties =
            feature.__source?.object?.properties;

          return +properties.radius || DEFAULT_SIZES.POINT_RADIUS;
        },
        getFillColor: (feature: CommonFCWithProperties['features'][0]) => {
          const color =
            feature.properties.fill || DEFAULT_COLORS.EDIT.GEOJSON.FILL.COLOR;

          const opacity =
            feature.properties['fill-opacity'] ||
            DEFAULT_COLORS.EDIT.GEOJSON.FILL.OPACITY;

          return hexToRgbaArray(color, opacity);
        },
        getLineColor: (feature: CommonFCWithProperties['features'][0]) => {
          const color =
            feature.properties.stroke || DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

          const opacity =
            feature.properties['stroke-opacity'] ||
            DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY;

          return hexToRgbaArray(color, opacity);
        },
        getLineWidth: (feature: any) => {
          if (feature.properties['stroke-width']) {
            return +feature.properties['stroke-width'];
          } else {
            return DEFAULT_SIZES.LINE_WIDTH;
          }
        },
      },
      'polygons-stroke': {
        type: PathLayer,
        getColor: (feature: any) => {
          const properties: CommonLayerFeatureProperties =
            feature.__source?.object?.properties;

          const color =
            properties.stroke || DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

          const opacity =
            properties['stroke-opacity'] ||
            DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY;

          return hexToRgbaArray(color, opacity);
        },
      },
      'polygons-fill': {
        type: PolygonLayer,
        getFillColor: (feature: CommonFCWithProperties['features'][0]) => {
          const color =
            feature.properties.fill || DEFAULT_COLORS.EDIT.GEOJSON.FILL.COLOR;

          const opacity =
            feature.properties['fill-opacity'] ||
            DEFAULT_COLORS.EDIT.GEOJSON.FILL.OPACITY;

          return hexToRgbaArray(color, opacity);
        },
        getLineColor: (feature: CommonFCWithProperties['features'][0]) => {
          const color =
            feature.properties.stroke || DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

          const opacity =
            feature.properties['stroke-opacity'] ||
            DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY;

          return hexToRgbaArray(color, opacity);
        },
        getLineWidth: (feature: CommonFCWithProperties['features'][0]) => {
          if (feature.properties['stroke-width']) {
            return +feature.properties['stroke-width'];
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
            properties['stroke-opacity'] ||
            DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY;

          return hexToRgbaArray(color, opacity);
        },
        getWidth: (feature: any) => {
          const properties: CommonLayerFeatureProperties =
            feature.__source?.object?.properties;

          if (properties?.['stroke-width']) {
            return +properties['stroke-width'];
          } else {
            return DEFAULT_SIZES.LINE_WIDTH;
          }
        },
      },
    },
  });
};
