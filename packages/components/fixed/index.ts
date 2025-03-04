import { withInstall } from "../../utils/install";
import Fixed from "./src/fixed.vue";
import type { FixedProps, FixedEmits } from "./src/props";
import "./src/style.ts";

export const XFixed = withInstall<FixedProps, FixedEmits>(Fixed);

export type { FixedProps, FixedEmits };

export default XFixed;
