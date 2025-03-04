import type { DialogProps } from "../../components/dialog";

export interface DialogOptions extends Partial<DialogProps> {
  /**
   * 传递给内容组件的 props
   */
  componentProps?: Record<string, any>;
}

export interface DialogInstance {
  /**
   * 关闭对话框
   */
  close: (value?: any) => void;
  /**
   * 更新对话框属性
   */
  update: (options: DialogOptions) => void;
}

export type DialogReturn = Promise<any> & {
  /**
   * 对话框实例
   */
  instance: DialogInstance;
};
