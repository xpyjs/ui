import type { Slot, SlotsType } from "vue";
import type {
  ComponentType,
  ComponentSize,
  ComponentVariant
} from "../../../types/basic";

type CloseShowType = "always" | "hover";

export interface TagProps {
  /**
   * 标签类型

   * @default 'default'
   */
  type?: ComponentType;
  /**
   * 标签尺寸
   * @default 'medium'
   */
  size?: ComponentSize;
  /**
   * 标签变体样式
   * @default 'filled'
   */
  variant?: Extract<ComponentVariant, "filled" | "outlined">;
  /**
  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean;
  /**
   * 关闭按钮展示方式
   * @default 'always'
   */
  closeShowType?: CloseShowType;
}

export const tagEmits = {
  close: (e: MouseEvent) => e instanceof MouseEvent
} as const;

export type TagEmits = typeof tagEmits;

export type TagSlots = SlotsType<{
  /**
   * 默认内容
   */
  default?: Slot;
  /**
   * 关闭按钮
   */
  close?: Slot;
}>;
