import type { ExtractPropTypes, PropType } from "vue";
import type {
  VerticalAlign,
  ComponentType,
  TransitionName
} from "@/types/basic";

type ToastType = Omit<ComponentType, "secondary">;

export interface ToastProps {
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 显示的文本内容
   */
  content?: string;
  /**
   * Toast 类型
   */
  type?: ToastType;
  /**
   * 显示位置
   */
  top?: VerticalAlign | string | number;
  /**
   * 自定义图标
   */
  icon?: string;
  /**
   * 是否反转颜色
   */
  inverse?: boolean;
  /**
  /**
   * 显示时长(ms)
   */
  duration?: number;
  /**
   * 过渡动画名称
   */
  transitionName?: TransitionName | false;
}

export const toastEmits = {
  "update:visible": (visible: boolean) => true,
  close: () => true
} as const;

export type ToastEmits = typeof toastEmits;
