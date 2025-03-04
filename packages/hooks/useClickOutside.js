import { useEventListener } from "@/hooks/useEvent";
import {} from "@/types/element";
import {} from "vue";
export function useClickOutside(clickRefs, handler) {
    const handleClickOutside = (e) => {
        const target = e.target;
        // 点击触发元素内部时不处理
        if (clickRefs.some(ref => ref.value?.contains(target))) {
            return;
        }
        handler(e);
    };
    useEventListener(document, "mousedown", handleClickOutside);
    return {
        handleClickOutside
    };
}
