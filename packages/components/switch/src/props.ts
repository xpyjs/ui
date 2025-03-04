import type { Slot, SlotsType } from "vue";
import type { ComponentType, ComponentSize } from "../../../types/basic";

export interface SwitchProps {
  /**
   * 开关类型
   */
  type?: ComponentType;
  /**
   * 开关尺寸
   */
  size?: ComponentSize;
  /**
   * 是否选中
   */
  modelValue?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 打开时的颜色
   */
  activeColor?: string;
  /**
   * 关闭时的颜色
   */
  inactiveColor?: string;
  /**
   * 打开时的图标
   */
  activeIcon?: string;
  /**
   * 关闭时的图标
   */
  inactiveIcon?: string;
  /**
   * 打开时的文本
   */
  activeText?: string;
  /**
   * 关闭时的文本
   */
  inactiveText?: string;
}

export const switchEmits = {
  "update:modelValue": (value: boolean) => typeof value === "boolean",
  change: (value: boolean) => typeof value === "boolean"
} as const;

export type SwitchEmits = typeof switchEmits;

export type SwitchSlots = SlotsType<{
  activeIcon?: Slot;
  inactiveIcon?: Slot;
}>;
