import { _GlobeView, COORDINATE_SYSTEM, MapView } from '@deck.gl/core';
import { FaGlobeEurope } from 'react-icons/fa';

export const viewModes = [
  {
    mode: new MapView(),
    name: '3D',
    coordinateSystem: COORDINATE_SYSTEM.DEFAULT,
  },
  {
    mode: new _GlobeView(),
    name: 'Глобус',
    icon: FaGlobeEurope,
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
  },
];