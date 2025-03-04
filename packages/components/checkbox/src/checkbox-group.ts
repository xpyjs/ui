import type { Slot, SlotsType } from "vue";
import type {
  ComponentType,
  ComponentSize,
  Direction
} from "../../../types/basic";

export interface CheckboxGroupProps {
  /**
   * 复选框组类型
   */
  type?: ComponentType;
  /**
   * 复选框组尺寸
   */
  size?: ComponentSize;
  /**
   * 选中值
   */
  modelValue?: (string | number)[];
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 布局方向
   */
  direction?: Direction;
  /**
   * 间距
   */
  gap?: string | number;
  /**
   * 全选状态
   *
   * @value [true] 全选
   * @value [false] 不全选
   * @value [null] 不确定
   */
  all?: boolean | null;
}

export const checkboxGroupEmits = {
  "update:modelValue": (value: (string | number)[]) => true,
  change: (value: (string | number)[]) => true,
  "update:all": (value: boolean | null) => true
} as const;

export type CheckboxGroupEmits = typeof checkboxGroupEmits;

export type CheckboxGroupSlots = SlotsType<{
  default?: Slot;
}>;
