import { withInstall } from "../../utils/install";
import Menu from "./src/menu.vue";
import type { MenuProps, MenuEmits } from "./src/props";
import "./src/style";

export type MenuInstance = InstanceType<typeof Menu>;

export const XMenu = withInstall<MenuProps, MenuEmits>(Menu);

export type { MenuProps, MenuEmits };

export default XMenu;
