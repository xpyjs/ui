/**
 * 计算元素尺寸和位置
 */
export function getBoundingClientRect(element?: Element | null) {
  if (!element) return;

  const { top, right, bottom, left, width, height } =
    element.getBoundingClientRect();
  return {
    top,
    right,
    bottom,
    left,
    width,
    height,
    centerX: left + width / 2,
    centerY: top + height / 2,
    offsetWidth: element.clientWidth,
    offsetHeight: element.clientHeight
  };
}
