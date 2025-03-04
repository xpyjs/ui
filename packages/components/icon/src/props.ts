export interface IconProps {
  /**
   * 图标名称，支持 iconify
   *
   * @description iconify 图标教程：https://iconify.design/
   * @description 查找图标，访问：https://icon-sets.iconify.design/
   *
   * @argument 支持 url 前缀。可以传递一个地址
   */
  name?: string;
  /**
   * 一段 svg 图标文本内容。 优先级比 name 高，会覆盖 name。
   *
   * @description 该属性会尽可能的移除 svg 内容的所有关于大小、颜色等的默认值，使 svg 图标可以随属性变化而变化
   *
   * @example 它应当是一个引入文件的内容，而不是一个文件路径。例如：
   * ```js
   * import addIcon from "./icons/add.svg?raw"; // vite 的引入方式。 其他方式可以参看具体文档
   * ```
   */
  content?: string;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 图标大小
   */
  size?: string | number;
}
