import { type XStyle } from "@/types/element";
import type { Component, Slot, SlotsType } from "vue";

export type LoadingType = "spinner" | "dots" | "snake" | "pulse" | "wave";

export interface LoadingProps {
  /**
   * 是否显示加载状态
   */
  visible?: boolean;
  /**
   * 加载动画类型
   */
  type?: LoadingType;
  /**
   * 自定义图标
   */
  icon?: string | Component;
  /**
   * 自定义图标样式
   */
  iconStyle?: XStyle;
  /**
   * 加载提示文本
   */
  text?: string;
  /**
   * 背景遮罩
   */
  mask?: boolean;
  /**
   * 全屏显示
   */
  fullscreen?: boolean;
}

export type LoadingSlots = SlotsType<{
  default?: Slot;
  icon?: Slot;
}>;
