// 基础颜色类型
export type ComponentType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// 组件尺寸
export type ComponentSize = "small" | "medium" | "large";

// 组件变体
export type ComponentVariant = "filled" | "light" | "outlined" | "text";

// 组件形状
export type ComponentShape = "default" | "round" | "circle" | "square";

export type ModelValue =
  | string
  | number
  | unknown
  | (string | number | unknown)[];

export type Direction = "horizontal" | "vertical";

export type VerticalAlign = "top" | "bottom" | "center";

// 动画名称
export type TransitionName =
  | "x-fade"
  | "x-zoom"
  | "x-slide"
  | "x-slide-up"
  | "x-slide-down"
  | "x-slide-left"
  | "x-slide-right";
