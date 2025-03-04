/**
 * 从对象中忽略指定的属性,返回新对象
 * @param obj 源对象
 * @param keys 要忽略的属性名(可以是字符串、字符串数组或多个字符串参数)
 * @returns 忽略指定属性后的新对象
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { c: 3 }
 * omit({ a: 1, b: 2, c: 3 }, 'a') // { b: 2, c: 3 }
 * omit({ a: 1, b: 2, c: 3 }, 'a', 'b') // { c: 3 }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: (K | K[])[]
): Omit<T, K> {
  if (!obj) return {} as Omit<T, K>;

  // 处理所有的 keys,展平为数组
  const keysToOmit = new Set(
    keys.reduce<K[]>((acc, key) => {
      if (Array.isArray(key)) {
        return [...acc, ...key];
      }
      return [...acc, key];
    }, [])
  );

  // 创建新对象,只包含未被忽略的属性
  const result = {} as Omit<T, K>;
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      !keysToOmit.has(key as unknown as K)
    ) {
      (result as any)[key] = obj[key];
    }
  }

  return result;
}

/**
 * 从对象中选择指定的属性,返回新对象
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: (K | K[])[]
): Pick<T, K> {
  if (!obj) return {} as Pick<T, K>;

  const keysToPick = new Set(
    keys.reduce<K[]>((acc, key) => {
      if (Array.isArray(key)) {
        return [...acc, ...key];
      }
      return [...acc, key];
    }, [])
  );

  const result = {} as Pick<T, K>;
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      keysToPick.has(key as unknown as K)
    ) {
      (result as any)[key] = obj[key];
    }
  }

  return result;
}
