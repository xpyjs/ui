import type { Color, ColorFormat } from "@/utils/color";
import { type ComponentSize } from "@/types/basic";

export interface ColorPickerProps {
  /**
   * 选中的颜色值
   */
  modelValue?: Color | null;
  /**
   * 是否显示透明度选择
   */
  showAlpha?: boolean;
  /**
   * 是否显示下方文本框
   */
  showText?: boolean;
  /**
   * 指定输出颜色格式
   */
  format?: ColorFormat;
  /**
   * 是否内联模式
   */
  inline?: boolean;
  /**
   * 大小
   */
  size?: ComponentSize;
}

export const colorPickerEmits = {
  "update:modelValue": (value: string | null) => true,
  change: (value: string | null) => true
} as const;

export type ColorPickerEmits = typeof colorPickerEmits;
