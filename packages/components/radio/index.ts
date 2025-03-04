import { withInstall } from "../../utils/install";
import Radio from "./src/radio.vue";
import type { RadioProps, RadioEmits, RadioSlots } from "./src/props";
import "./src/style.ts";

export type RadioInstance = InstanceType<typeof Radio>;

export const XRadio = withInstall<RadioProps, RadioEmits, RadioSlots>(Radio);

export type { RadioProps, RadioEmits, RadioSlots };

export default XRadio;
