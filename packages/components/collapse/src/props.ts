import { type Direction } from "@/types/basic";
import type { Slot, SlotsType } from "vue";

export interface CollapseProps {
  /**
   * 是否展开
   */
  visible?: boolean;
  /**
   * 标题
   */
  label?: string;
  /**
   * 展开方向
   */
  direction?: Direction;
  /**
   * 指定展开尺寸（高度/宽度）
   */
  size?: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 唯一标识，用于分组控制
   */
  name?: string | number;
}

export const collapseEmits = {
  "update:visible": (value: boolean) => true,
  change: (value: boolean) => true
} as const;

export type CollapseEmits = typeof collapseEmits;

export type CollapseSlots = SlotsType<{
  /**
   * 触发器内容
   */
  trigger?: (props: { expanded: boolean }) => any;
  /**
   * 默认内容
   */
  default?: Slot;
}>;
