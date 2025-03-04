import { withInstall } from "../../utils/install";
import CheckboxGroup from "../checkbox/src/checkbox-group.vue";
import type {
  CheckboxGroupProps,
  CheckboxGroupEmits,
  CheckboxGroupSlots
} from "../checkbox/src/checkbox-group";
import "./src/style";

export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>;

export const XCheckboxGroup = withInstall<
  CheckboxGroupProps,
  CheckboxGroupEmits,
  CheckboxGroupSlots
>(CheckboxGroup);

export type { CheckboxGroupProps, CheckboxGroupEmits, CheckboxGroupSlots };

export default XCheckboxGroup;
