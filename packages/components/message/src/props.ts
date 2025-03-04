import type {
  ComponentType,
  VerticalAlign,
  TransitionName
} from "@/types/basic";

type MessageType = Omit<ComponentType, "secondary">;

export interface MessageProps {
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 消息内容
   */
  content?: string;
  /**
   * 消息类型
   */
  type?: MessageType;
  /**
   * 显示位置
   */
  top?: VerticalAlign | string | number;
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
   * 过渡动画名称
   */
  transitionName?: TransitionName | false;
}

export const messageEmits = {
  "update:visible": (visible: boolean) => true,
  close: () => true
} as const;

export type MessageEmits = typeof messageEmits;
