import { type Ref, watch } from "vue";
import { useZIndex } from "@/hooks/useZIndex";
import { useScrollLock } from "@/hooks/useScrollLock";

export function useModal(props: {
  visible: Ref<boolean>;
  lockScroll: Ref<boolean>;
}) {
  const { zIndex, generateZIndex } = useZIndex();
  const { lock, unlock } = useScrollLock(props.visible, props.lockScroll);

  const handleVisibilityChange = (visible: boolean) => {
    if (visible) {
      generateZIndex();
      if (props.lockScroll.value) lock();
    } else {
      if (props.lockScroll.value) unlock();
    }
  };

  watch(
    () => props.visible.value,
    val => {
      handleVisibilityChange(val);
    }
  );
  return {
    zIndex: zIndex.value,
    handleVisibilityChange
  };
}
