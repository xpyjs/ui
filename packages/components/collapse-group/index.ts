import { withInstall } from "../../utils/install";
import CollapseGroup from "../collapse/src/collapse-group.vue";
import type {
  CollapseGroupProps,
  CollapseGroupEmits,
  CollapseGroupSlots
} from "../collapse/src/collapse-group";
import "./src/style";

export type CollapseGroupInstance = InstanceType<typeof CollapseGroup>;

export const XCollapseGroup = withInstall<
  CollapseGroupProps,
  CollapseGroupEmits,
  CollapseGroupSlots
>(CollapseGroup);

export type { CollapseGroupProps, CollapseGroupEmits, CollapseGroupSlots };

export default XCollapseGroup;
