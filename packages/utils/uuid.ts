/**
 * 生成id
 * @param len 指定id的长度。不给长度，生成 uuid
 * @param radix 进制，默认16进制
 */
export function generateId(len?: number, radix = 16) {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
  const id = [];
  let i;
  if (len) {
    for (i = 0; i < len; i++) {
      id[i] = chars[0 | (Math.random() * (radix || chars.length))];
    }
  } else {
    chars = chars.splice(0, 16);
    let r;
    id[8] = id[13] = id[18] = id[23] = "-";
    id[14] = "4";
    for (i = 0; i < 36; i++) {
      if (!id[i]) {
        r = 0 | (Math.random() * 16);
        id[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return id.join("");
}
