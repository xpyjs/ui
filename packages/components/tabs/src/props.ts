import { type Direction } from "@/types/basic";

export type TabsType = "line" | "card" | "round";

export interface TabItem {
  id?: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  closable?: boolean;
}
export interface TabsProps {
  /**
   * 当前激活的标签页
   */
  modelValue?: string | number;
  /**
   * 标签指示器类型
   */
  type?: TabsType;
  /**
   * 标签页列表
   */
  items?: TabItem[];
  /**
   * 布局方向
   */
  direction?: Direction;
  /**
   * 是否可以新增标签页
   */
  addable?: boolean;
  /**
   * 是否可以关闭标签页
   */
  closable?: boolean;
  /**
   * 切换前的钩子函数。
   * 返回 true 则切换，返回 false 则不切换
   */
  beforeChange?: (id: string | number) => boolean | Promise<boolean>;
}

export const tabsEmits = {
  "update:modelValue": (value: string | number) => true,
  change: (value: string | number) => true,
  close: (id: string | number) => true,
  add: () => true
} as const;

export type TabsEmits = typeof tabsEmits;
