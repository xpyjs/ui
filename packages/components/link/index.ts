import { withInstall } from "../../utils/install";
import Link from "./src/link.vue";
import type { LinkProps, LinkEmits, LinkSlots } from "./src/props";
import "./src/style";

export type XLinkInstance = InstanceType<typeof Link>;

export const XLink = withInstall<LinkProps, LinkEmits, LinkSlots>(Link);

export type { LinkProps, LinkEmits, LinkSlots };

export default XLink;
