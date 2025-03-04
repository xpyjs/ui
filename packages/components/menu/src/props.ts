import type { MenuItem } from "@/types/menu";
import type { TriggerType, PlacementType } from "@/components/popup/src/types";

export const menuEmits = {
  select: (item: MenuItem) => true,
  open: () => true,
  close: () => true
} as const;

export interface MenuProps {
  /**
   * 菜单数据
   */
  menu: MenuItem[];
  /**
   * 触发方式
   */
  trigger?: TriggerType;
  /**
   * 弹出位置
   */
  placement?: PlacementType;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}

export type MenuEmits = typeof menuEmits;
