import type { ComponentSize, ComponentType } from "../../../types/basic";

export interface InputNumberProps {
  /**
   * 绑定值
   */
  modelValue?: number | null;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 精度
   */
  precision?: number;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 尺寸
   */
  size?: ComponentSize;
  /**
   * 状态
   */
  status?: Extract<ComponentType, "success" | "warning" | "error">;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 是否可清空
   */
  clearable?: boolean;
}

export const inputNumberEmits = {
  "update:modelValue": (value: number | null) => true,
  change: (value: number | null, evt: Event) => true,
  input: (value: number | null, evt: Event) => true,
  focus: (evt: FocusEvent) => true,
  blur: (evt: FocusEvent) => true,
  clear: () => true
} as const;

export type InputNumberEmits = typeof inputNumberEmits;
