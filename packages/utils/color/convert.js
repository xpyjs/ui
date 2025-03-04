// hex 转 rgb
export const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0, a = undefined;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    else if (hex.length === 9) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
        a = parseInt(hex.slice(7, 9), 16) / 255;
    }
    return { r, g, b, a };
};
// rgb 转 hex
export const rgbToHex = ({ r, g, b, a }) => {
    const toHex = (x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return a === undefined ? hex : `${hex}${toHex(a * 255)}`;
};
// rgb 转 hsv
export const rgbToHsv = ({ r, g, b, a }) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0;
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: h * 360,
        s: s * 100,
        v: v * 100,
        a
    };
};
// hsv 转 rgb
export const hsvToRgb = ({ h, s, v, a }) => {
    h = h / 360;
    s = s / 100;
    v = v / 100;
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a
    };
};
// rgb 转 hsl
export const rgbToHsl = ({ r, g, b, a }) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: h * 360,
        s: s * 100,
        l: l * 100,
        a
    };
};
// hsl 转 rgb
export const hslToRgb = ({ h, s, l, a = 1 }) => {
    // 将 hsl 值标准化到 0-1 范围
    h = h / 360;
    s = s / 100;
    l = l / 100;
    let r = 0, g = 0, b = 0;
    if (s === 0) {
        // 如果饱和度为 0,则表示灰度色
        r = g = b = l;
    }
    else {
        // 辅助函数,计算色相区间的值
        const hue2rgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    // 将 0-1 范围转换为 0-255 范围
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a
    };
};
