import { withInstall } from "../../utils/install";
import Popup from "./src/popup.vue";
import type { PopupProps, PopupEmits } from "./src/props.ts";
import "./src/style.ts";

export type PopupInstance = InstanceType<typeof Popup>;

export const XPopup = withInstall<PopupProps, PopupEmits>(Popup);

export type { PopupProps, PopupEmits };

export default XPopup;
