import type { Slot, SlotsType } from "vue";
import type { ComponentType, ComponentSize } from "../../../types/basic";

export interface CheckboxProps {
  /**
   * 复选框类型
   */
  type?: ComponentType;
  /**
   * 复选框形状
   */
  shape?: "check" | "dot";
  /**
   * 复选框尺寸
   */
  size?: ComponentSize;
  /**
   * 选中值
   */
  modelValue?: boolean | any[];
  /**
   * 复选框值
   */
  value?: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 标签内容
   */
  label?: string;
  /**
   * 是否为不确定状态
   */
  indeterminate?: boolean;
}

export const checkboxEmits = {
  "update:modelValue": (value: boolean | any[]) => true,
  change: (value: boolean | any[]) => true
} as const;

export type CheckboxEmits = typeof checkboxEmits;

export type CheckboxSlots = SlotsType<{
  default?: Slot;
  inner?: (props: {
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
  }) => any;
}>;
