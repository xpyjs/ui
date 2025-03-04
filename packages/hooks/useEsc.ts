import { useEventListener } from "@/hooks/useEvent";
import { type Ref } from "vue";

export function useEsc(
  visible: Ref<boolean>,
  esc: Ref<boolean>,
  onEsc?: () => void
) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && esc.value && visible.value) {
      onEsc?.();
    }
  };

  useEventListener(document, "keydown", handleKeyDown);
}
