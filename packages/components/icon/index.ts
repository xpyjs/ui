import { withInstall } from "../../utils/install";
import Icon from "./src/icon.vue";
import type { IconProps } from "./src/props";
import "./src/style";

export type IconInstance = InstanceType<typeof Icon>;

export const XIcon = withInstall<IconProps>(Icon);

export type { IconProps };

export default XIcon;
