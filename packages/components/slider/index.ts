import { withInstall } from "../../utils/install";
import Slider from "./src/slider.vue";
import type { SliderProps, SliderEmits, SliderSlots } from "./src/props";
import "./src/style.ts";

export type XSliderInstance = InstanceType<typeof Slider>;

export const XSlider = withInstall<SliderProps, SliderEmits, SliderSlots>(
  Slider
);

export type { SliderProps, SliderEmits, SliderSlots };

export default XSlider;
