import { unrefElement } from "@/utils/dom/unrefElement";
import { onBeforeUnmount, ref, watch } from "vue";
export function useResizeObserver(target, callback) {
    const observer = ref();
    const cleanup = () => {
        if (observer.value) {
            observer.value.disconnect();
            observer.value = undefined;
        }
    };
    const observe = () => {
        cleanup();
        const targetElement = unrefElement(target);
        if (!targetElement)
            return;
        observer.value = new ResizeObserver(callback);
        observer.value.observe(targetElement);
    };
    // 监听目标元素变化
    const stopWatch = watch(() => target, newValue => {
        if (newValue) {
            observe();
        }
        else {
            cleanup();
        }
    }, { immediate: true });
    // 组件卸载时清理
    onBeforeUnmount(() => {
        cleanup();
        stopWatch();
    });
    return {
        cleanup
    };
}
