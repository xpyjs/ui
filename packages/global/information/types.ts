import type { InformationProps } from "../../components/information/src/props";

export interface InformationOptions
  extends Partial<Omit<InformationProps, "visible">> {
  /**
   * 传递给内容组件的 props
   */
  componentProps?: Record<string, any>;
}
