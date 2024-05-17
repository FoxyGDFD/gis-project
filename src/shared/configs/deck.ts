import { DeckGLProps } from "@deck.gl/react";

export const defaultDeckGlConfig: DeckGLProps = {
  initialViewState: {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
  },
  controller: {
    doubleClickZoom: false,
  },
};
