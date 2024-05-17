import { DotFilledIcon } from '@radix-ui/react-icons';
import {
    DrawLineStringMode,
    DrawPointMode,
    DrawPolygonByDraggingMode,
  } from '@deck.gl-community/editable-layers';
  import { MdOutlineTimeline } from 'react-icons/md';
  import { PiPolygonDuotone } from 'react-icons/pi';
  
  export const drawModes = [
    {
      mode: new DrawPointMode(),
      icon: DotFilledIcon,
      name: 'Точки',
    },
    {
      mode: new DrawLineStringMode(),
      icon: MdOutlineTimeline,
      name: 'Линии',
    },
    {
      mode: new DrawPolygonByDraggingMode(),
      icon: PiPolygonDuotone,
      name: 'Расстояние',
    },
  ];