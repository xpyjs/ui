import { withInstall } from "../../utils/install";
import Scroll from "./src/scroll.vue";
import type { ScrollProps, ScrollEmits } from "./src/props";
import "./src/style.ts";
export type XScrollInstance = InstanceType<typeof Scroll>;

export const XScroll = withInstall<ScrollProps, ScrollEmits>(Scroll);

export type { ScrollProps, ScrollEmits };

export default XScroll;
