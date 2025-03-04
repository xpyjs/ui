import { withInstall } from "../../utils/install";
import Input from "./src/input.vue";
import type { InputProps, InputEmits, InputSlots } from "./src/props.ts";
import "./src/style";
export type XInputInstance = InstanceType<typeof Input>;

export const XInput = withInstall<InputProps, InputEmits, InputSlots>(Input);

export type { InputProps, InputEmits, InputSlots };

export default XInput;
