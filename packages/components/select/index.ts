import { withInstall } from "../../utils/install";
import Select from "./src/select.vue";
import type { SelectProps, SelectEmits } from "./src/props";
import "./src/style.ts";

export const XSelect = withInstall<SelectProps, SelectEmits>(Select);

export type { SelectProps, SelectEmits };

export default XSelect;
