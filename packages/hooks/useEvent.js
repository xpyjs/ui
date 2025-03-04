import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { warn } from "../utils/console";
export function useEventListener(target, event, handler, options) {
    let cleanup = null;
    const setupListener = () => {
        if (!target) {
            warn("useEventListener", "target is not a valid element.");
            return;
        }
        if (cleanup) {
            cleanup();
        }
        target.addEventListener(event, handler, options);
        cleanup = () => {
            target.removeEventListener(event, handler, options);
        };
    };
    onMounted(setupListener);
    onBeforeUnmount(() => {
        if (cleanup) {
            cleanup();
        }
    });
    watchEffect(() => {
        setupListener();
    });
}
