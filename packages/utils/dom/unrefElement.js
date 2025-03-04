import { toValue } from "vue";
export function unrefElement(elRef) {
    if (!elRef)
        return null;
    if (typeof elRef === "string") {
        return document.querySelector(elRef);
    }
    const plain = toValue(elRef);
    return plain?.$el ?? plain;
}
