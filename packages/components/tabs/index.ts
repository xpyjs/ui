import { withInstall } from "../../utils/install";
import Tabs from "./src/tabs.vue";
import type { TabsProps, TabsEmits } from "./src/props";
import "./src/style";

export type TabsInstance = InstanceType<typeof Tabs>;

export const XTabs = withInstall<TabsProps, TabsEmits>(Tabs);

export type { TabsProps, TabsEmits, TabItem } from "./src/props";

export default XTabs;
