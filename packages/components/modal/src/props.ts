import { type TransitionName } from "@/types/basic";
import { type AppendTo } from "@/types/element";

export interface ModalProps {
  /**
   * 是否显示
   */
  visible?: boolean;
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
   * 是否显示遮罩
   */
  mask?: boolean;
  /**
   * 是否在点击遮罩时关闭
   */
  maskClosable?: boolean;
  /**
   * 是否全屏
   */
  fullscreen?: boolean;
  /**
   * 遮罩层z-index
   */
  zIndex?: number;
  /**
   * 过渡动画名称
   */
  transitionName?: TransitionName | false;
}

export const modalEmits = {
  "update:visible": (visible: boolean) => true,
  show: () => true,
  shown: () => true,
  hide: () => true,
  hidden: () => true
} as const;

export type ModalEmits = typeof modalEmits;
