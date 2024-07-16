import {
  ModifyMode,
  RotateMode,
  ScaleMode,
  TransformMode,
} from "@deck.gl-community/editable-layers";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoMdMove } from "react-icons/io";
import { MdRebaseEdit } from "react-icons/md";
import { LuScale3D } from "react-icons/lu";

export const transformModes = [
  {
    mode: new ModifyMode(),
    icon: MdRebaseEdit,
    name: "Добавление/изменение точек",
  },
  {
    mode: new TransformMode(),
    icon: IoMdMove,
    name: "Перемещение",
  },
  {
    mode: new RotateMode(),
    icon: FaArrowRotateRight ,
    name: "Вращение",
  },
  {
    mode: new ScaleMode(),
    icon: LuScale3D,
    name: "Масштабирование",
  },
];
