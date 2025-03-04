import { watch } from "vue";
let lockCount = 0;
const originalStyles = new Map();
export function useScrollLock(visible, lockScroll) {
    const lock = (el = document.body) => {
        if (lockCount === 0) {
            originalStyles.set(el, el.style.overflow);
            el.style.overflow = "hidden";
        }
        lockCount++;
    };
    const unlock = (el = document.body) => {
        lockCount--;
        if (lockCount === 0) {
            const originalStyle = originalStyles.get(el);
            if (originalStyle !== undefined) {
                el.style.overflow = originalStyle;
                originalStyles.delete(el);
            }
        }
    };
    watch(() => visible.value && lockScroll.value, value => {
        if (value) {
            lock();
        }
        else {
            unlock();
        }
    });
    return { lock, unlock };
}
