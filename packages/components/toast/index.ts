import { withInstall } from "../../utils/install";
import Toast from "./src/toast.vue";
import type { ToastProps } from "./src/props";
import "./src/style";

export const XToast = withInstall<ToastProps>(Toast);

export type { ToastProps };
export default XToast;
