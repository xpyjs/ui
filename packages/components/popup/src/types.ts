import { type TransitionName } from "@/types/basic";

// 触发方式
export type TriggerType =
  | "hover"
  | "click"
  | "focus"
  | "contextmenu"
  | "manual";

// 弹出位置
export type PlacementType =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

// 弹窗选项
export interface PopupOptions {
  placement?: PlacementType;
  trigger?: TriggerType;
  offset?: number;
  showArrow?: boolean;
  transitionName?: TransitionName;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  blurDelay?: number;
  openDelay?: number;
  closeDelay?: number;
  zIndex?: number;
  disabled?: boolean;
  hideOnClick?: boolean;
  enterable?: boolean;
  appendTo?: HTMLElement | "body" | null;
}
