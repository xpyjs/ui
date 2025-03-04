import { toValue } from "vue";
import type { ComponentPublicInstance, MaybeRef } from "vue";

export type VueInstance = ComponentPublicInstance;
export type MaybeElement =
  | Element
  | HTMLElement
  | SVGElement
  | VueInstance
  | undefined
  | null;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRef<T>;
export type UnrefElement<T extends MaybeElement = MaybeElement> =
  T extends VueInstance ? Exclude<T, VueInstance> : T | null;

export function unrefElement<T extends MaybeElement = MaybeElement>(
  elRef?: MaybeElementRef<T> | string
): UnrefElement<T> {
  if (!elRef) return null as UnrefElement<T>;
  if (typeof elRef === "string") {
    return document.querySelector(elRef) as UnrefElement<T>;
  }

  const plain = toValue(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}
