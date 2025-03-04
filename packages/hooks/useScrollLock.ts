import { watch, type Ref } from "vue";

let lockCount = 0;
const originalStyles = new Map<HTMLElement, string>();

export function useScrollLock(visible: Ref<boolean>, lockScroll: Ref<boolean>) {
  const lock = (el: HTMLElement = document.body) => {
    if (lockCount === 0) {
      originalStyles.set(el, el.style.overflow);
      el.style.overflow = "hidden";
    }
    lockCount++;
  };

  const unlock = (el: HTMLElement = document.body) => {
    lockCount--;
    if (lockCount === 0) {
      const originalStyle = originalStyles.get(el);
      if (originalStyle !== undefined) {
        el.style.overflow = originalStyle;
        originalStyles.delete(el);
      }
    }
  };

  watch(
    () => visible.value && lockScroll.value,
    value => {
      if (value) {
        lock();
      } else {
        unlock();
      }
    }
  );

  return { lock, unlock };
}
