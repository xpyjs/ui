import {} from "../../types/color";
import { hexToRgb, hslToRgb, hsvToRgb, rgbToHex, rgbToHsl } from "./convert";
export * from "../../types/color";
export * from "./convert";
// 解析颜色字符串
const parseColorString = (color) => {
    // 移除空格
    color = color.trim();
    // 处理 hex 格式
    if (color.startsWith("#")) {
        return hexToRgb(color);
    }
    // 处理 rgb/rgba 格式
    if (color.startsWith("rgb")) {
        const values = color.match(/\d+(\.\d+)?/g);
        if (!values)
            return null;
        return {
            r: Math.min(255, Math.max(0, Number(values[0]))),
            g: Math.min(255, Math.max(0, Number(values[1]))),
            b: Math.min(255, Math.max(0, Number(values[2]))),
            a: values[3] ? Math.min(1, Math.max(0, Number(values[3]))) : 1
        };
    }
    // 处理 hsl/hsla 格式
    if (color.startsWith("hsl")) {
        const values = color.match(/\d+(\.\d+)?/g);
        if (!values)
            return null;
        return hslToRgb({
            h: Number(values[0]),
            s: Number(values[1]),
            l: Number(values[2]),
            a: values[3] ? Math.min(1, Math.max(0, Number(values[3]))) : 1
        });
    }
    return null;
};
// 解析颜色
export const parseColor = (color) => {
    if (!color)
        return null;
    // 处理字符串格式
    if (typeof color === "string") {
        return parseColorString(color);
    }
    // 处理 RGB 对象
    if ("r" in color) {
        return {
            r: Math.min(255, Math.max(0, color.r)),
            g: Math.min(255, Math.max(0, color.g)),
            b: Math.min(255, Math.max(0, color.b)),
            a: color.a !== undefined ? Math.min(1, Math.max(0, color.a)) : undefined
        };
    }
    // 处理 HSV 对象
    if ("v" in color) {
        return hsvToRgb(color);
    }
    // 处理 HSL 对象
    if ("l" in color) {
        return hslToRgb(color);
    }
    return null;
};
// 格式化颜色输出
export const formatColor = (color, format = "hex") => {
    if (!color)
        return null;
    // 先解析为 RGB 格式
    const rgb = parseColor(color);
    if (!rgb)
        return null;
    // 根据指定格式输出
    switch (format) {
        case "hex":
            return rgbToHex(rgb);
        case "rgb":
            return rgb.a === undefined
                ? `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`
                : `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${rgb.a})`;
        case "hsl": {
            const hsl = rgbToHsl(rgb);
            return hsl.a === undefined
                ? `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
                : `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a})`;
        }
        default:
            return null;
    }
};
// 判断两个颜色是否相同
export const isSameColor = (color1, color2) => {
    // 如果都为 null，则相同
    if (color1 === null && color2 === null)
        return true;
    // 如果只有一个为 null，则不同
    if (color1 === null || color2 === null)
        return false;
    // 转换为 RGB 格式
    const rgb1 = parseColor(color1);
    const rgb2 = parseColor(color2);
    // 如果转换失败，则不同
    if (!rgb1 || !rgb2)
        return false;
    // 比较 RGB 值
    return (rgb1.r === rgb2.r &&
        rgb1.g === rgb2.g &&
        rgb1.b === rgb2.b &&
        // 如果没有透明度，则默认为 1
        (rgb1.a ?? 1) === (rgb2.a ?? 1));
};
