import type { Slot, SlotsType } from "vue";
import type {
  ComponentType,
  ComponentSize,
  ComponentVariant,
  ComponentShape
} from "../../../types/basic";
import { type LoadingProps } from "@/components/loading";

export interface IButtonProps {
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: ComponentType;
  /**
   * 按钮大小
   * @default 'medium'
   */
  size?: ComponentSize;
  /**
   * 按钮变体款式
   * @default 'filled'
   */
  variant?: ComponentVariant;
  /**
   * 按钮外观形状
   * @default 'default'
   */
  shape?: ComponentShape;
  /**
   * 按钮是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 按钮是否加载中
   * @default false
   */
  loading?: boolean;
  /**
   * 按钮加载选项
   */
  loadingOptions?: Omit<LoadingProps, "visible">;
  /**
   * 按钮是否扁平化
   * @default false
   */
  flat?: boolean;
  /**
   * 按钮水波纹效果
   * @default true
   */
  ripple?: boolean;
}

export type ButtonProps = IButtonProps;

export const buttonEmits = {
  /**
   * 按钮点击事件
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 按钮长按事件，500ms 后触发
   */
  longpress: (e: MouseEvent) => e instanceof MouseEvent
} as const;

export type ButtonEmits = typeof buttonEmits;

export type ButtonSlots = SlotsType<{
  /**
   * 默认插槽，用于显示按钮的主要内容
   */
  default?: Slot;
  /**
   * loading 状态的图标插槽
   */
  loading?: Slot;
  /**
   * 图标插槽，用于显示按钮的前置图标
   */
  icon?: Slot;
}>;
