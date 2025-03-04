import type { ComponentSize, ModelValue } from "../../../types/basic";
import { type PopupProps } from "@/components/popup";

// 选项类型定义
export interface SelectItem {
  label?: string;
  value?: string | number;
  disabled?: boolean;

  [key: string]: any;
}

/**
 * 选项参数
 *
 * @param label - 选项标签。默认值 'label'
 * @param value - 选项值。默认值 'value'
 */
export interface SelectOption {
  label?: string;
  value?: string;
}

export type SelectType = "default" | "tag";

export interface SelectProps {
  /**
   * 选择器值
   *
   * @description 选择器值类型与选项列表类型不一致，可以通过值或选项的 key 来查找。
   */
  modelValue?: ModelValue;
  /**
   * 选项列表
   */
  items?: SelectItem[];
  /**
   * 选项配置
   */
  options?: SelectOption;
  /**
   * 多选模式下，选中的展示样式
   */
  type?: SelectType;
  /**
   * 选择器尺寸
   * @default "medium"
   */
  size?: ComponentSize;
  /**
   * 选择器占位符
   */
  placeholder?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 是否可清除
   */
  clearable?: boolean;
  /**
   * popup 组件的 props
   */
  popupProps?: Omit<PopupProps, "visible">;
}

export const selectEmits = {
  "update:modelValue": (value: ModelValue) => true,
  change: (value: ModelValue | SelectItem) => true,
  clear: () => true
} as const;

export type SelectEmits = typeof selectEmits;
