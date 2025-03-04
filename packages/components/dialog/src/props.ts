import { type VerticalAlign } from "@/types/basic";
import type { Slot } from "vue";
import { modalEmits, type ModalProps } from "@/components/modal/src/props";

export interface DialogProps extends ModalProps {
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 是否显示关闭按钮
   */
  showClose?: boolean;
  /**
   * 宽度
   */
  width?: string | number;
  /**
   * 顶部距离（当 vertical 不为 center 时生效）
   */
  top?: string | number;
  /**
   * 内容是否水平居中
   */
  center?: boolean;
  /**
   * 垂直对齐方式
   */
  vertical?: VerticalAlign;
  /**
   * 固定内容高度
   */
  bodyHeight?: string | number;
  /**
   * 是否显示底部
   */
  showFooter?: boolean;
  /**
   * 自定义类名
   */
  customClass?: string;
}

export const dialogEmits = {
  ...modalEmits,
  confirm: (value: any) => true,
  cancel: (reason: any) => true,
  close: (value: any) => true
} as const;

export type DialogEmits = typeof dialogEmits;

export type DialogSlots = {
  default?: Slot;
  title?: Slot;
  footer?: Slot;
};
