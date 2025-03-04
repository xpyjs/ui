import type { PlacementType, TriggerType } from "./types";
import { type AppendTo, type XClass, type XStyle } from "@/types/element";
import { type TransitionName } from "@/types/basic";

export interface PopupProps {
  /**
   * 是否显示弹窗
   */
  visible?: boolean;
  /**
   * 触发方式
   */
  trigger?: TriggerType;
  /**
  /**
   * 手动触发的 reference
   */
  reference?: Element | string | null;
  /**
  /**
   * 弹出位置
   */
  placement?: PlacementType;
  /**
   * 弹窗内容与触发元素的距离
   */
  offset?: number;
  /**
   * 是否显示箭头
   */
  showArrow?: boolean;
  /**
   * 过渡动画名称
   */
  transitionName?: TransitionName | false;
  /**
   * 移入延迟时间(ms)
   */
  showDelay?: number;
  /**
   * 移出延迟时间(ms)
   */
  hideDelay?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 点击外部是否关闭
   */
  hideOnClick?: boolean;
  /**
   * 是否可以移入弹窗
   */
  enterable?: boolean;
  /**
   * 挂载节点
   */
  appendTo?: AppendTo;
  /**
   * 是否在按下 Esc 键时关闭
   */
  esc?: boolean;
  /**
   * 是否锁定滚动
   */
  lockScroll?: boolean;
  /**
   * 是否自动聚焦第一个可聚焦元素
   */
  autoFocus?: boolean;
  /**
   * 关闭时是否恢复焦点
   */
  restoreFocus?: boolean;
  /**
   * 是否对齐触发元素的宽度
   */
  alignWidth?: boolean;
  /**
   * 弹出层样式
   */
  popupClass?: XClass;
  /**
   * 弹出层样式
   */
  popupStyle?: XStyle;
}

export const popupEmits = {
  "update:visible": (visible: boolean) => true,
  show: () => true,
  shown: () => true,
  hide: () => true,
  hidden: () => true,
  "click-outside": (event: MouseEvent) => true
} as const;

export type PopupEmits = typeof popupEmits;
