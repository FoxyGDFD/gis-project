import { BaseTile, CommonLayerFeatureProperties } from "../types";

export const DEFAULT_COLORS = {
  HIGHLIGHT: [0, 0, 0, 255 * 0.2],
  
  EDIT: {
    HIGHLIGHTED: [249, 182, 78, 255 * 0.7],

    GUIDES: {
      FILL: [249, 182, 78, 255 * 0.3],
      LINE: [249, 182, 78],
    },

    GEOJSON: {
      FILL: {
        COLOR: "#4d4d4d",
        OPACITY: 255 * 0.3,
      },
      LINE: {
        COLOR: "#4d4d4d",
        OPACITY: 255 * 0.7,
      },
    },
  },
  MEASURE: {
    FILL: {
      TENTATIVE: [255, 97, 97, 255 * 0.3],
      EDIT: [0, 255, 0, 255 * 0.3],
    },
    LINE: {
      TENTATIVE: [255, 97, 97, 255],
      EDIT: [0, 255, 0, 255],
    },
  },
};

export const DEFAULT_SIZES = {
  LINE_WIDTH: 1,
  POINT_RADIUS: 10,
};

const OSM = [
  {
    abbr: "OSM",
    id: "OSM-1",
    layer: {
      data: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
      id: "OSM",
      type: "TileLayer",
    },
    src: "/images/base-map-tiles/open-street-maps.jpg",
    title: "Open Street Map",
  },
];

const GoogleMaps = [
  {
    abbr: "Hybrid",
    id: "Google-1",
    layer: {
      data: [
        "https://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        "https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        "https://mt2.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        "https://mt3.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      ],
      id: "Hybrid",
      type: "TileLayer",
    },
    src: "/images/base-map-tiles/google-maps-hybrid.png",
    title: "Google Hybrid",
  },
  {
    abbr: "Sattelite",
    id: "Google-2",
    layer: {
      data: [
        "https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        "https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        "https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      ],
      id: "Sattelite",
      type: "TileLayer",
    },
    src: "/images/base-map-tiles/google-maps-sattelite.png",
    title: "Google Sattelite",
  },
  {
    abbr: "Streets",
    id: "Google-3",
    layer: {
      data: [
        "https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        "https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        "https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      ],
      id: "Streets",
      type: "TileLayer",
    },
    src: "/images/base-map-tiles/google-maps-streets.png",
    title: "Google Streets",
  },
  {
    abbr: "Terrain",
    id: "Google-4",
    layer: {
      data: [
        "https://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        "https://mt2.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
        "https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      ],
      id: "Terrain",
      type: "TileLayer",
    },
    src: "/images/base-map-tiles/google-maps-terrain.png",
    title: "Google Terrain",
  },
];

const ESRI = [
  {
    abbr: "Dark",
    id: "ESRI-1",
    layer: {
      data: "https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      id: "Dark Gray",
      type: "TileLayer",
    },
    src: "/images/base-map-tiles/esri-dark.png",
    title: "ESRI Dark Gray",
  },
  {
    abbr: "Light",
    id: "ESRI-2",
    layer: {
      data: "https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      id: "Light Gray",
      type: "TileLayer",
    },
    src: "/images/base-map-tiles/esri-light.png",
    title: "ESRI Light Gray",
  },
];

export const baseTiles: BaseTile[] = [...OSM, ...GoogleMaps, ...ESRI];

export const baseLayerStyles: {
  key: keyof CommonLayerFeatureProperties;
  value: string;
}[] = [
    {
      key: "fill",
      value: DEFAULT_COLORS.EDIT.GEOJSON.FILL.COLOR,
    },
    {
      key: "stroke",
      value: DEFAULT_COLORS.EDIT.GEOJSON.LINE.COLOR,
    },
    {
      key: "fill-opacity",
      value: DEFAULT_COLORS.EDIT.GEOJSON.FILL.OPACITY.toString(),
    },
    {
      key: "stroke-opacity",
      value: DEFAULT_COLORS.EDIT.GEOJSON.LINE.OPACITY.toString(),
    },
    { key: "stroke-width", value: DEFAULT_SIZES.LINE_WIDTH.toString() },
  ];
