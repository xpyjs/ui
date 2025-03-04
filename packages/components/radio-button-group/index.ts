import { withInstall } from "../../utils/install";
import RadioButtonGroup from "../radio-button/src/radio-button-group.vue";
import type {
  RadioButtonGroupProps,
  RadioButtonGroupEmits,
  RadioButtonGroupSlots
} from "../radio-button/src/radio-button-group";
import "./src/style.ts";

export type RadioButtonGroupInstance = InstanceType<typeof RadioButtonGroup>;

export const XRadioButtonGroup = withInstall<
  RadioButtonGroupProps,
  RadioButtonGroupEmits,
  RadioButtonGroupSlots
>(RadioButtonGroup);

export type {
  RadioButtonGroupProps,
  RadioButtonGroupEmits,
  RadioButtonGroupSlots
};

export default XRadioButtonGroup;
