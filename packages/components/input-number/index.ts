import { withInstall } from "../../utils/install";
import InputNumber from "./src/input-number.vue";
import type { InputNumberProps, InputNumberEmits } from "./src/props";
import "./src/style";

export type InputNumberInstance = InstanceType<typeof InputNumber>;

export const XInputNumber = withInstall<InputNumberProps, InputNumberEmits>(
  InputNumber
);

export type { InputNumberProps, InputNumberEmits };

export default XInputNumber;
