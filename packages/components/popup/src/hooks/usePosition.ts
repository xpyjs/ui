import { ref, watch, type Ref } from "vue";
import type { PlacementType } from "../types";
import { useEventListener } from "@/hooks/useEvent";
import { getBoundingClientRect } from "@/utils/dom/rect";

export function usePosition(
  triggerRef: Ref<Element | undefined>,
  popupRef: Ref<HTMLElement | undefined>,
  placement: Ref<PlacementType>,
  offset: Ref<number>
) {
  const position = ref({ top: 0, left: 0 });
  const actualPlacement = ref<PlacementType>(placement.value);

  const computePosition = () => {
    const triggerEl = triggerRef.value;
    const popupEl = popupRef.value;
    if (!triggerEl || !popupEl) return;

    const triggerRect = getBoundingClientRect(triggerEl)!;
    const popupRect = getBoundingClientRect(popupEl)!;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const _margin = 5; // 预留边距
    // 检查是否需要翻转位置
    const checkFlip = (currentPlacement: PlacementType): PlacementType => {
      switch (currentPlacement) {
        case "top":
        case "top-start":
        case "top-end":
          if (
            triggerRect.top - popupRect.offsetHeight - offset.value <
            _margin
          ) {
            return currentPlacement.replace("top", "bottom") as PlacementType;
          }
          break;
        case "bottom":
        case "bottom-start":
        case "bottom-end":
          if (
            triggerRect.bottom + popupRect.offsetHeight + offset.value >
            viewportHeight - _margin
          ) {
            return currentPlacement.replace("bottom", "top") as PlacementType;
          }
          break;
        case "left":
        case "left-start":
        case "left-end":
          if (
            triggerRect.left - popupRect.offsetWidth - offset.value <
            _margin
          ) {
            return currentPlacement.replace("left", "right") as PlacementType;
          }
          break;
        case "right":
        case "right-start":
        case "right-end":
          if (
            triggerRect.right + popupRect.offsetWidth + offset.value >
            viewportWidth - _margin
          ) {
            return currentPlacement.replace("right", "left") as PlacementType;
          }
          break;
      }
      return currentPlacement;
    };

    // 计算实际放置位置
    actualPlacement.value = checkFlip(placement.value);

    let top = 0;
    let left = 0;

    // 使用 actualPlacement 代替 placement.value 进行位置计算
    switch (actualPlacement.value) {
      case "top":
        top = triggerRect.top - popupRect.offsetHeight - offset.value;
        left =
          triggerRect.left + (triggerRect.width - popupRect.offsetWidth) * 0.5;
        break;
      case "top-start":
        top = triggerRect.top - popupRect.offsetHeight - offset.value;
        left = triggerRect.left;
        break;
      case "top-end":
        top = triggerRect.top - popupRect.offsetHeight - offset.value;
        left = triggerRect.left + triggerRect.width - popupRect.offsetWidth;
        break;
      case "bottom":
        top = triggerRect.top + triggerRect.height + offset.value;
        left =
          triggerRect.left + (triggerRect.width - popupRect.offsetWidth) * 0.5;
        break;
      case "bottom-start":
        top = triggerRect.top + triggerRect.height + offset.value;
        left = triggerRect.left;
        break;
      case "bottom-end":
        top = triggerRect.top + triggerRect.height + offset.value;
        left = triggerRect.left + triggerRect.width - popupRect.offsetWidth;
        break;
      case "left":
        top =
          triggerRect.top + (triggerRect.height - popupRect.offsetHeight) * 0.5;
        left = triggerRect.left - popupRect.offsetWidth - offset.value;
        break;
      case "left-start":
        top = triggerRect.top;
        left = triggerRect.left - popupRect.offsetWidth - offset.value;
        break;
      case "left-end":
        top = triggerRect.top + triggerRect.height - popupRect.offsetHeight;
        left = triggerRect.left - popupRect.offsetWidth - offset.value;
        break;
      case "right":
        top =
          triggerRect.top + (triggerRect.height - popupRect.offsetHeight) * 0.5;
        left = triggerRect.left + triggerRect.width + offset.value;
        break;
      case "right-start":
        top = triggerRect.top;
        left = triggerRect.left + triggerRect.width + offset.value;
        break;
      case "right-end":
        top = triggerRect.top + triggerRect.height - popupRect.offsetHeight;
        left = triggerRect.left + triggerRect.width + offset.value;
        break;
    }

    // 边界检查和调整
    if (left < _margin) {
      left = _margin;
    } else if (left + popupRect.offsetWidth > viewportWidth) {
      left = viewportWidth - popupRect.offsetWidth - _margin;
    }

    if (top < _margin) {
      top = _margin;
    } else if (top + popupRect.offsetHeight > viewportHeight) {
      top = viewportHeight - popupRect.offsetHeight - _margin;
    }

    position.value = { top, left };
  };

  // 监听相关属性变化
  watch(
    [
      () => placement.value,
      () => offset.value,
      () => triggerRef.value,
      () => popupRef.value
    ],
    computePosition,
    { immediate: true }
  );

  // 添加滚动和 resize 事件监听
  useEventListener(window, "resize", computePosition);
  useEventListener(window, "scroll", computePosition, { capture: true });

  return {
    position,
    actualPlacement,
    updatePosition: computePosition
  };
}
