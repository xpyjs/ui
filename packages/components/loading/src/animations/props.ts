import { type PropType } from "vue";
import { type LoadingType } from "../props";

export const animationProps = {
  /**
   * 动画类型
   */
  type: {
    type: String as () => LoadingType
  },
  /**
   * 自定义类名
   */
  customClass: {
    type: String,
    default: ""
  },
  /**
   * 动画大小
   */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 24
  },
  /**
   * 动画颜色
   */
  color: {
    type: String,
    default: "currentColor"
  }
} as const;
