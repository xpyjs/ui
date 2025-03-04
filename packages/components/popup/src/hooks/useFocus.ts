import { useEventListener } from "@/hooks/useEvent";
import { onBeforeUnmount, type Ref } from "vue";

export function useFocus(
  triggerRef: Ref<Element | undefined>,
  popupRef: Ref<HTMLElement | undefined>,
  visible: Ref<boolean>
) {
  let previousActiveElement: HTMLElement | null = null;

  const focusFirstElement = (el: HTMLElement) => {
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    first?.focus();
  };

  const handleFocusTrap = (e: KeyboardEvent) => {
    if (!visible.value || !popupRef.value) return;

    if (e.key === "Tab") {
      const focusable = popupRef.value.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  const savePreviousFocus = () => {
    previousActiveElement = document.activeElement as HTMLElement;
  };

  const restorePreviousFocus = () => {
    if (previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  };

  if (triggerRef.value) {
    useEventListener(triggerRef.value, "keydown", handleFocusTrap);
  }

  onBeforeUnmount(() => {
    restorePreviousFocus();
  });

  return {
    focusFirstElement,
    savePreviousFocus,
    restorePreviousFocus
  };
}
