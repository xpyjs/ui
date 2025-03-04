/**
 * 解析尺寸值
 */
export function wrapSize(size: any, defaultSize = "") {
  const validUnits = ["px", "%", "vh", "vw", "em", "rem"];

  if (size === undefined || size === null) {
    return defaultSize;
  }

  if (typeof size === "number") {
    return `${size}px`;
  }

  if (typeof size === "string") {
    // 检查是否包含有效单位
    const unitRegex = new RegExp(`^\\d+(${validUnits.join("|")})$`);
    if (unitRegex.test(size)) {
      return size;
    }

    // 处理带小数的数值
    const numberWithUnit = size.match(/^(\d*\.?\d+)(.*)/);
    if (numberWithUnit) {
      const [, value, unit] = numberWithUnit;
      if (validUnits.includes(unit)) {
        return size;
      }
      if (unit === "") {
        return `${value}px`;
      }
    }
  }

  return defaultSize;
}
