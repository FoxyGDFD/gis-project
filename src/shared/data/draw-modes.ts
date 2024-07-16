import { DotFilledIcon } from "@radix-ui/react-icons";
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonByDraggingMode,
  DrawPolygonMode,
} from "@deck.gl-community/editable-layers";
import { MdOutlineDraw, MdOutlineTimeline } from "react-icons/md";
import { PiPolygonDuotone } from "react-icons/pi";

export const createModes = [
  {
    mode: new DrawPointMode(),
    icon: DotFilledIcon,
    name: "Точки",
  },
  {
    mode: new DrawLineStringMode(),
    icon: MdOutlineTimeline,
    name: "Линии",
  },
  {
    mode: new DrawPolygonMode(),
    icon: PiPolygonDuotone,
    name: "Площадные объекты",
  },
  {
    mode: new DrawPolygonByDraggingMode(),
    icon: MdOutlineDraw,
    name: "Рисование площадных объектов",
  },
];
