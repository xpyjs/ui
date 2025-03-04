import type { ComponentType, TransitionName } from "@/types/basic";

type InformationType = Omit<ComponentType, "secondary">;
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface InformationProps {
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 消息类型
   */
  type?: InformationType;
  /**
   * 显示位置
   */
  position?: Position;
  /**
   * 显示时长(ms), 0 表示不自动关闭
   */
  duration?: number;
  /**
   * 是否可关闭
   */
  closable?: boolean;
  /**
   * 鼠标移入是否暂停关闭
   */
  enterable?: boolean;
  /**
   * 过渡动画名称,不传则根据位置自动判断
   */
  transitionName?: TransitionName | false;
}

export const informationEmits = {
  "update:visible": (visible: boolean) => true,
  close: () => true
} as const;

export type InformationEmits = typeof informationEmits;
