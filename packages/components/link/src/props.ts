import type { Slot, SlotsType } from "vue";
import type { ComponentType } from "../../../types/basic";

export interface LinkProps {
  /**
   * 链接类型
   */
  type?: ComponentType;
  /**
   * 链接地址
   */
  href?: string;
  /**
   * 链接打开方式
   */
  target?: string;
  /**
   * 是否显示下划线
   */
  underline?: boolean;
  /**
   * 是否禁用链接
   */
  disabled?: boolean;
}

export const linkEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent
} as const;

export type LinkEmits = typeof linkEmits;

export type LinkSlots = SlotsType<{
  default?: Slot;
  icon?: Slot;
}>;
