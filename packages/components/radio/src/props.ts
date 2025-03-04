import type { Slot, SlotsType } from "vue";
import type { ComponentType, ComponentSize } from "../../../types/basic";

export interface RadioProps {
  /**
   * 单选框类型
   */
  type?: ComponentType;
  /**
   * 单选框尺寸
   */
  size?: ComponentSize;
  /**
   * 单选框值
   */
  modelValue?: string | number | boolean;
  /**
   * 单选框的值
   */
  value?: string | number | boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 单选框标签
   */
  label?: string;
}

export const radioEmits = {
  "update:modelValue": (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
} as const;

export type RadioEmits = typeof radioEmits;

export type RadioSlots = SlotsType<{
  default?: Slot;
}>;
