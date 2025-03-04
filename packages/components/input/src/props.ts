import type { Slot, SlotsType } from "vue";
import type { ComponentSize, ComponentType } from "../../../types/basic";

export interface InputProps {
  /**
   * 输入值
   */
  modelValue?: string | number;
  /**
   * 输入类型
   */
  type?: "text" | "password" | "number" | "tel" | "email" | "url";
  /**
   * 输入框占位符
   */
  placeholder?: string;
  /**
   * 输入框大小
   */
  size?: ComponentSize;
  /**
   * 输入框状态
   */
  status?: Extract<ComponentType, "success" | "warning" | "error">;
  /**
   * 输入框是否禁用
   */
  disabled?: boolean;
  /**
   * 输入框是否只读
   */
  readonly?: boolean;
  /**
   * 输入框是否可清除
   */
  clearable?: boolean;
  /**
   * 输入框最大长度
   */
  maxLength?: number | string;
}

export const inputEmits = {
  "update:modelValue": (value: string | number) => true,
  change: (value: string | number, evt: Event) => true,
  input: (value: string | number, evt: Event) => true,
  focus: (evt: FocusEvent) => true,
  blur: (evt: FocusEvent) => true,
  clear: () => true
} as const;

export type InputEmits = typeof inputEmits;

export type InputSlots = SlotsType<{
  /**
   * 前缀图标
   */
  prefix?: Slot;
  /**
   * 后缀图标
   */
  suffix?: Slot;
  /**
   * 前置内容
   */
  prepend?: Slot;
  /**
   * 后置内容
   */
  append?: Slot;
  /**
   * 清除按钮图标
   */
  clearIcon?: Slot;
}>;
