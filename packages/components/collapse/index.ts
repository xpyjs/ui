import { withInstall } from "../../utils/install";
import Collapse from "./src/collapse.vue";
import type { CollapseProps, CollapseEmits, CollapseSlots } from "./src/props";
import "./src/style";

export type CollapseInstance = InstanceType<typeof Collapse>;

export const XCollapse = withInstall<
  CollapseProps,
  CollapseEmits,
  CollapseSlots
>(Collapse);

export type { CollapseProps, CollapseEmits, CollapseSlots };

export default XCollapse;
