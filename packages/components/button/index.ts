import { withInstall } from "../../utils/install";
import Button from "./src/button.vue";
import type { ButtonProps, ButtonEmits, ButtonSlots } from "./src/props";
import "./src/style";

// 导出组件实例类型
export type ButtonInstance = InstanceType<typeof Button>;

// 导出组件
export const XButton = withInstall<ButtonProps, ButtonEmits, ButtonSlots>(
  Button
);

// 导出类型
export type { ButtonProps, ButtonEmits, ButtonSlots };

// 默认导出
export default XButton;
