import {
  CommonFCWithProperties,
  CommonLayerFeatureProperties,
  EditableLayer,
} from '@/shared/types';
import { hexToRgbaArray } from '@/shared/utils';
import {
  EditableGeoJsonLayer,
  GeoJsonEditMode,
  ViewMode,
} from '@deck.gl-community/editable-layers';
import { PathStyleExtension } from '@deck.gl/extensions';
import {
  GeoJsonLayer,
  IconLayer,
  IconLayerProps,
  PathLayer,
  PathLayerProps,
  PolygonLayer,
  ScatterplotLayer,
  ScatterplotLayerProps,
} from '@deck.gl/layers';
import { FeatureCollection } from 'geojson';
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEditMapStore } from '../store/edit';
import { DEFAULT_COLORS, DEFAULT_SIZES } from '../data';

type CreateEditableLayerProps = {
  setSelectedFeatureIndexes: Dispatch<SetStateAction<number[]>>;
  setPickingInfo: Dispatch<SetStateAction<any>>;
  selectedFeatureIndexes: number[];
  editMode: GeoJsonEditMode;
  data: EditableLayer;
};

export const createEditableLayer = (props: CreateEditableLayerProps) => {
  return new EditableGeoJsonLayer({
    id: `edit-${props.data.id.toString()}`,
    layerId: props.data.id,

    data: props.data.featureCollection as any,
    selectedFeatureIndexes: props.selectedFeatureIndexes,
    mode: props.editMode,
    modeConfig: {
      enableSnapping: true,
      additionalSnapTargets: props.data.featureCollection.features,
    },

    onEdit({ updatedData, editContext }, a) {
      const features = updatedData.features.map(f =>
        !f.id ? { ...f, id: uuidv4() } : f
      );
      useEditMapStore.getState().setEditableLayer({
        ...useEditMapStore.getState().editableLayer,
        featureCollection: { ...updatedData, features } as FeatureCollection,
      } as any);

    },

    onClick(pickingInfo, event) {
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
          'points-icon': {
            type: IconLayer,
          } as IconLayerProps<string> & { type: any },
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
                feature.properties.fill ||
                DEFAULT_COLORS.EDIT.GEOJSON.FILL.COLOR;

              const opacity =
                feature.properties['fill-opacity'] ||
                DEFAULT_COLORS.EDIT.GEOJSON.FILL.OPACITY;

              return hexToRgbaArray(color, opacity);
            },
            getLineColor: (feature: CommonFCWithProperties['features'][0]) => {
              const color =
                feature.properties.stroke ||
                DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

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
          } as unknown as ScatterplotLayerProps<any> & { type: any },
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
          } as unknown as PathLayerProps<string> & { type: any },
          'polygons-fill': {
            type: PolygonLayer,
            getFillColor: (feature: CommonFCWithProperties['features'][0]) => {
              const color =
                feature.properties.fill ||
                DEFAULT_COLORS.EDIT.GEOJSON.FILL.COLOR;

              const opacity =
                feature.properties['fill-opacity'] ||
                DEFAULT_COLORS.EDIT.GEOJSON.FILL.OPACITY;

              return hexToRgbaArray(color, opacity);
            },
            getLineColor: (feature: CommonFCWithProperties['features'][0]) => {
              const color =
                feature.properties.stroke ||
                DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR;

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
          } as unknown as PathLayerProps<string> & { type: any },
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
          } as unknown as PathLayerProps<string> & { type: any },
        },
      } as unknown as GeoJsonLayer<any>,
      guides: {
        pointType: 'circle',
        extensions: [
          new PathStyleExtension({ dash: true, highPrecisionDash: false }),
        ],
        getDashArray: [10, 4],
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
          'points-circle': {
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
          } as unknown as ScatterplotLayerProps<any> & { type: any },
        },
      } as unknown as GeoJsonLayer<any>,
    },
  });
};
