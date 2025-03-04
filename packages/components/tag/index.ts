import { withInstall } from "../../utils/install";
import Tag from "./src/tag.vue";
import type { TagProps, TagEmits, TagSlots } from "./src/props";
import "./src/style.ts";

export type XTagInstance = InstanceType<typeof Tag>;

export const XTag = withInstall<TagProps, TagEmits, TagSlots>(Tag);

export type { TagProps, TagEmits, TagSlots };

export default XTag;
