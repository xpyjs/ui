// 颜色对象类型定义

export interface AlphaColor {
  a?: number; // 透明度 (0-1)
}

export interface HSVColor extends AlphaColor {
  h: number; // 色相 (0-360)
  s: number; // 饱和度 (0-100)
  v: number; // 明度 (0-100)
}

export interface RGBColor extends AlphaColor {
  r: number; // 红色 (0-255)
  g: number; // 绿色 (0-255)
  b: number; // 蓝色 (0-255)
}

export interface HSLColor extends AlphaColor {
  h: number; // 色相 (0-360)
  s: number; // 饱和度 (0-100)
  l: number; // 亮度 (0-100)
}

export type Color = RGBColor | HSVColor | HSLColor | string;

export type ColorFormat = "hex" | "rgb" | "hsl";
