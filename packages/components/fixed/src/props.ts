export interface FixedProps {
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 挂载的目标元素
   */
  target?: string | HTMLElement;
  /**
   * 初始位置
   */
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  /**
   * 是否可拖拽
   */
  draggable?: boolean;
  /**
   * z-index
   */
  zIndex?: number;
}

export const fixedEmits = {
  /**
   * 拖拽开始事件
   */
  dragging: (val: boolean) => true,
  /**
   * 位置改变事件
   */
  change: (position: { top: number; left: number }) => true
} as const;

export type FixedEmits = typeof fixedEmits;
