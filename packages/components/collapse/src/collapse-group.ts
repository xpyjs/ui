import { type Direction } from "@/types/basic";
import type { Slot, SlotsType, ComputedRef, Ref } from "vue";

export interface CollapseGroupProps {
  /**
   * 当前展开的面板(手风琴模式)
   */
  active?: string | number;
  /**
   * 展开的面板集合(多选模式)
   */
  modelValue?: (string | number)[];
  /**
   * 是否手风琴模式
   */
  accordion?: boolean;
  /**
   * 展开方向
   */
  direction?: Direction;
}

export const collapseGroupEmits = {
  "update:active": (value: string | number) => true,
  "update:modelValue": (value: (string | number)[]) => true,
  change: (value: string | number | (string | number)[]) => true
} as const;

export type CollapseGroupEmits = typeof collapseGroupEmits;

export type CollapseGroupSlots = SlotsType<{
  default?: Slot;
}>;

// 注入的上下文类型
export type CollapseGroupContext = {
  active: ComputedRef<string | number>;
  activeList: Ref<(string | number)[]>;
  accordion: ComputedRef<boolean>;
  direction: ComputedRef<Direction>;
  handleItemClick: (name: string | number) => void;
};
