import { useEventListener } from "@/hooks/useEvent";
import {} from "vue";
export function useEsc(visible, esc, onEsc) {
    const handleKeyDown = (e) => {
        if (e.key === "Escape" && esc.value && visible.value) {
            onEsc?.();
        }
    };
    useEventListener(document, "keydown", handleKeyDown);
}
