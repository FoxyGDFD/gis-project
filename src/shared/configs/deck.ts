import { DeckGLProps } from "@deck.gl/react";

export const defaultDeckGlConfig: DeckGLProps = {
  initialViewState: {
    longitude: 37.6156,
    latitude: 55.752,
    zoom: 13,
  },
  controller: {
    doubleClickZoom: false,
  },
};
