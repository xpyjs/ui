import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { warn } from "../utils/console";

export function useEventListener<T extends keyof HTMLElementEventMap>(
  target: EventTarget | null | undefined,
  event: T,
  handler: (e: HTMLElementEventMap[T]) => void,
  options?: AddEventListenerOptions
) {
  let cleanup: (() => void) | null = null;

  const setupListener = () => {
    if (!target) {
      warn("useEventListener", "target is not a valid element.");
      return;
    }
    if (cleanup) {
      cleanup();
    }
    target.addEventListener(event, handler as EventListener, options);
    cleanup = () => {
      target.removeEventListener(event, handler as EventListener, options);
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
