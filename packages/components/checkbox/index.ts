import { withInstall } from "../../utils/install";
import Checkbox from "./src/checkbox.vue";
import type {
  CheckboxProps,
  CheckboxEmits,
  CheckboxSlots
} from "./src/checkbox";
import "./src/style";

export type CheckboxInstance = InstanceType<typeof Checkbox>;

export const XCheckbox = withInstall<
  CheckboxProps,
  CheckboxEmits,
  CheckboxSlots
>(Checkbox);

export type { CheckboxProps, CheckboxEmits, CheckboxSlots };

export default XCheckbox;
