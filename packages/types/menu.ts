// 基础菜单项类型
export interface BaseMenuItem {
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 文本内容
   */
  label?: string;
  /**
   * 图标名称
   */
  icon?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否隐藏
   */
  hidden?: boolean;
  /**
   * 自定义类名
   */
  class?: string;
  /**
   * 自定义样式
   */
  style?: Record<string, any>;
}

// 上下文菜单项
export interface MenuItem extends BaseMenuItem {
  /**
   * 项目类型
   */
  type?: "item" | "divider";
  /**
   * 子菜单项
   */
  children?: MenuItem[];
  /**
   * 点击事件
   */
  action?: () => void;
}

// 导航菜单项
export interface NavItem extends BaseMenuItem {
  /**
   * 路由路径
   */
  path?: string;
  /**
   * 子菜单项
   */
  children?: NavItem[];
  /**
   * 点击事件
   */
  action?: () => void;
}
