import { FeatureCollection } from "@deck.gl-community/editable-layers";
import { GeoJsonLayer } from "@deck.gl/layers";

export type DeckLayer = GeoJsonLayer;

export type BaseTile = {
  id: string;
  title: string;
  abbr: string;
  src: string;
  layer: {
    id: string;
    type: "TileLayer" | string;
    data: string | string[];
  };
};

export type CommonLayerFeatureProperties = {
  stroke: string;
  "stroke-width": number;
  "stroke-opacity": number;
  fill: string;
  "fill-opacity": number;
};

export type CommonFCWithProperties = FeatureCollection & {
  properties: CommonLayerFeatureProperties;
};

export type EditableLayer = {
  id: string;
  file: {
    name: string;
    size: number;
    type: string;
  };
  layer: FeatureCollection;
  featureCollection: FeatureCollection;
};
