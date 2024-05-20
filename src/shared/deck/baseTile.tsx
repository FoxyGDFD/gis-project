import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, BitmapLayerProps } from "@deck.gl/layers";
import { BaseTile } from "../types";

export const createBaseMapTile = (
  baseTile: BaseTile,
  coordinateSystem: BitmapLayerProps["coordinateSystem"],
) => {
  return new TileLayer({
    tileSize: 256,
    ...baseTile.layer,

    renderSubLayers: (props: any) => {
      const {
        bbox: { east, north, south, west },
      } = props.tile;

      return new BitmapLayer(props, {
        _imageCoordinateSystem: coordinateSystem,
        bounds: [west, south, east, north],
        data: undefined,
        image: props.data,
      });
    },
  });
};
