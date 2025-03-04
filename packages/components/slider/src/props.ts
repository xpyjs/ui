import type { Slot, SlotsType } from "vue";
import type { ComponentSize, ComponentType } from "../../../types/basic";

export interface SliderProps {
  /**
   * 滑块的值
   */
  modelValue: number | [number, number];
  /**
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 步长
   */
  step?: number;
  /**
  /**
   * 是否显示步进按钮
   */
  showButtons?: boolean;
  /**
  /**
   * 是否显示刻度
   */
  showTicks?: boolean;
  /**
  /**
   * 是否显示数值
   */
  showValue?: boolean;
  /**
  /**
   * 方向
   */
  vertical?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 组件尺寸
   */
  size?: ComponentSize;
  /**
  /**
   * 组件类型
   */
  type?: ComponentType;
}

export const sliderEmits = {
  "update:modelValue": (value: number | [number, number]) => true,
  change: (value: number | [number, number]) => true,
  input: (value: number | [number, number]) => true,
  "drag-end": () => true
} as const;

export type SliderEmits = typeof sliderEmits;

export type SliderSlots = SlotsType<{
  /**
   * 自定义滑块按钮
   */
  button?: Slot;
  /**
   * 自定义增加按钮
   */
  increase?: Slot;
  /**
   * 自定义减少按钮
   */
  decrease?: Slot;
  /**
   * 自定义数值显示
   */
  value?: Slot;
}>;
