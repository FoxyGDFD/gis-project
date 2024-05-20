import { CommonLayerFeatureProperties } from "@/shared/types";
import { FeatureCollection } from "geojson";

export type CommonLayerVariables = {
  name: string;
  layerId: number;
};

export type CommonLayerMethods<
  D,
  FC = FeatureCollection,
  F = FeatureCollection["features"],
> = {
  getData: () => D | undefined;
  getName: () => string;
  getCenter: () => [number, number];
  getLayerBounds: () => GeoJSON.BBox;
  getFeatureCollection: () => FC;
  getFeatures: () => F;
  getProperties: (
    featureId: number,
  ) => CommonLayerFeatureProperties | Record<string, any>;
};

export type CommonLayerState<D> = CommonLayerVariables & CommonLayerMethods<D>;
