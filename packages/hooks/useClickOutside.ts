import { useEventListener } from "@/hooks/useEvent";
import { type El } from "@/types/element";
import { type Ref } from "vue";

export function useClickOutside(
  clickRefs: Ref<El | undefined>[],
  handler: (e: MouseEvent) => void
) {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

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
