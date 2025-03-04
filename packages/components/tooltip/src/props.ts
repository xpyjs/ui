import type { Slot, SlotsType } from "vue";
import { type PopupProps } from "@/components/popup/src/props";
import { type PlacementType } from "@/components/popup/src/types";

export interface TooltipProps
  extends Pick<PopupProps, "offset" | "showArrow" | "disabled"> {
  /**
   * 提示内容
   */
  content?: string;
  /**
   * 是否反转颜色
   */
  inverse?: boolean;
  /**
   * 移入延迟时间(ms)
   */
  showDelay?: number;
  /**
   * 移出延迟时间(ms)
   */
  hideDelay?: number;
  /**
   * 是否可以移入弹窗
   */
  enterable?: boolean;
  /**
   * 弹出位置
   */
  placement?: PlacementType;
}

export const tooltipEmits = {} as const;

export type TooltipEmits = typeof tooltipEmits;

export type TooltipSlots = SlotsType<{
  /**
   * 默认内容
   */
  default?: Slot;
}>;
