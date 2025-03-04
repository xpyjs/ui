import { type XClass, type XStyle } from "@/types/element";

type ScrollbarType = "always" | "hover" | "never";

export interface ScrollProps {
  /**
   * 是否启用横向滚动
   * @default true
   */
  scrollX?: boolean;
  /**
   * 是否启用纵向滚动
   * @default true
   */
  scrollY?: boolean;
  /**
   * 滚动条显示方式
   * @default 'hover'
   */
  scrollbarType?: ScrollbarType;
  /**
   * 滚动条宽度
   * @default 6
   */
  size?: number;
  /**
   * 滚动条轨道颜色
   */
  trackColor?: string;
  /**
   * 滚动条滑块颜色
   */
  thumbColor?: string;
  /**
   * 滚动条悬停颜色
   */
  thumbHoverColor?: string;
  /**
   * 内容样式类
   */
  contentClass?: XClass;
  /**
   * 内容样式
   */
  contentStyle?: XStyle;
}

export const scrollEmits = {
  scroll: (e: Event) => e instanceof Event,
  "scroll-end": () => true
} as const;

export type ScrollEmits = typeof scrollEmits;
