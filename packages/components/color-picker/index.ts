import { withInstall } from "../../utils/install";
import ColorPicker from "./src/color-picker.vue";
import type { ColorPickerProps, ColorPickerEmits } from "./src/props";
import "./src/style";

export type ColorPickerInstance = InstanceType<typeof ColorPicker>;

export const XColorPicker = withInstall<ColorPickerProps, ColorPickerEmits>(
  ColorPicker
);

export type { ColorPickerProps, ColorPickerEmits };

export default XColorPicker;
