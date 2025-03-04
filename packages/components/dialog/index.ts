import { withInstall } from "../../utils/install";
import Dialog from "./src/dialog.vue";
import type { DialogProps, DialogEmits, DialogSlots } from "./src/props.ts";
import "./src/style";

export type DialogInstance = InstanceType<typeof Dialog>;

export const XDialog = withInstall<DialogProps, DialogEmits, DialogSlots>(
  Dialog
);

export type { DialogProps, DialogEmits, DialogSlots };

export default XDialog;
