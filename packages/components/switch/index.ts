import { withInstall } from "../../utils/install";
import Switch from "./src/switch.vue";
import type { SwitchProps, SwitchEmits, SwitchSlots } from "./src/props";
import "./src/style.ts";

export type XSwitchInstance = InstanceType<typeof Switch>;

export const XSwitch = withInstall<SwitchProps, SwitchEmits, SwitchSlots>(
  Switch
);

export type { SwitchProps, SwitchEmits, SwitchSlots };

export default XSwitch;
