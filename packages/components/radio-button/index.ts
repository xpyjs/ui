import { withInstall } from "../../utils/install";
import RadioButton from "./src/radio-button.vue";
import type {
  RadioButtonProps,
  RadioButtonEmits,
  RadioButtonSlots
} from "./src/radio-button";
import "./src/style.ts";
export type RadioButtonInstance = InstanceType<typeof RadioButton>;

export const XRadioButton = withInstall<
  RadioButtonProps,
  RadioButtonEmits,
  RadioButtonSlots
>(RadioButton);

export type { RadioButtonProps, RadioButtonEmits, RadioButtonSlots };

export default XRadioButton;
