import type { ComponentType } from "@/types/basic";

export interface BreadcrumbItem {
  /**
   * 显示的文本(必需)
   */
  label: string;
  /**
   * 跳转的路由路径
   */
  to?: string;
  /**
   * 点击事件
   */
  action?: () => void;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义图标
   */
  icon?: string;
  /**
   * 额外的类名
   */
  class?: string;
}

/**
 * 面包屑组件 Props
 */
export interface BreadcrumbProps {
  /**
   * 面包屑类型
   */
  type?: ComponentType;
  /**
   * 面包屑数据
   */
  items?: BreadcrumbItem[];
  /**
   * 分隔符
   */
  separator?: string;
  /**
   * 分隔符图标
   */
  separatorIcon?: string;
}

export const breadcrumbEmits = {
  /**
   * 点击事件
   */
  click: (item: BreadcrumbItem) => true
} as const;

export type BreadcrumbEmits = typeof breadcrumbEmits;
