import { withInstall } from "../../utils/install";
import Tooltip from "./src/tooltip.vue";
import type { TooltipProps, TooltipSlots, TooltipEmits } from "./src/props";
import "./src/style.ts";

export type XTooltipInstance = InstanceType<typeof Tooltip>;

export const XTooltip = withInstall<TooltipProps, TooltipEmits, TooltipSlots>(
  Tooltip
);
export type { TooltipProps, TooltipSlots, TooltipEmits };
export default XTooltip;
