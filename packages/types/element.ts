import { type StyleValue } from "vue";

export type El = HTMLElement | SVGElement | Element;

export type XClass = string | string[] | Record<string, boolean>;
export type XStyle = StyleValue;

export type AppendTo = string | HTMLElement | null;
