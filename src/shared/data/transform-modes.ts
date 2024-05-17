import {
  CompositeMode,
  ModifyMode,
  TranslateMode,
} from "@deck.gl-community/editable-layers";
import { TbTransform } from "react-icons/tb";

const CustomTransformMode = new CompositeMode([
  new TranslateMode(),
  new ModifyMode(),
]);

export const transformModes = [
  {
    mode: CustomTransformMode,
    icon: TbTransform,
    name: "Изменение",
  },
];
