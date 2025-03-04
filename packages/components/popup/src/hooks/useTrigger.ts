import { ref, watch, onBeforeUnmount, type Ref } from "vue";
import type { TriggerType } from "../types";

export function useTrigger(
  visible: Ref<boolean>,
  trigger: Ref<TriggerType>,
  disabled: Ref<boolean>,
  enterable: Ref<boolean>,
  {
    openDelay = 0,
    closeDelay = 0,
    showDelay = 100,
    hideDelay = 100,
    focusDelay = 0,
    blurDelay = 0,
    onChange
  }: {
    openDelay?: number;
    closeDelay?: number;
    showDelay?: number;
    hideDelay?: number;
    focusDelay?: number;
    blurDelay?: number;
    onChange: (visible: boolean) => void;
  }
) {
  const popupVisible = ref(false);
  let timeoutId: number | null = null;

  // 清除定时器
  const clearTimer = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  // 延迟切换状态
  const delaySetVisible = (value: boolean, delay: number) => {
    if (disabled.value) return;
    clearTimer();
    if (delay) {
      timeoutId = window.setTimeout(() => {
        popupVisible.value = value;
        onChange(value);
      }, delay);
    } else {
      popupVisible.value = value;
      onChange(value);
    }
  };

  // 点击处理
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (trigger.value === "click") {
      delaySetVisible(
        !popupVisible.value,
        popupVisible.value ? closeDelay : openDelay
      );
    } else if (trigger.value === "manual") {
      popupVisible.value = !popupVisible.value;
      delaySetVisible(
        !popupVisible.value,
        popupVisible.value ? closeDelay : openDelay
      );
    }
  };

  // 右键处理
  const handleContextMenu = (e: MouseEvent) => {
    if (trigger.value === "contextmenu") {
      e.preventDefault();
      delaySetVisible(
        !popupVisible.value,
        popupVisible.value ? closeDelay : openDelay
      );
    }
  };

  // 鼠标移入处理
  const handleMouseEnter = () => {
    if (trigger.value === "hover") {
      delaySetVisible(true, showDelay);
    }
  };

  // 鼠标移出处理
  const handleMouseLeave = () => {
    if (trigger.value === "hover") {
      delaySetVisible(false, hideDelay);
    }
  };

  const handlePopupMouseEnter = () => {
    if (trigger.value === "hover" && enterable.value) {
      popupVisible.value = true;
      delaySetVisible(true, 0);
    }
  };

  const handlePopupMouseLeave = () => {
    if (trigger.value === "hover" && enterable.value) {
      delaySetVisible(false, hideDelay);
    }
  };

  // 获得焦点处理
  const handleFocus = () => {
    if (trigger.value === "focus") {
      delaySetVisible(true, focusDelay);
    }
  };

  // 失去焦点处理
  const handleBlur = () => {
    if (trigger.value === "focus") {
      delaySetVisible(false, blurDelay);
    }
  };

  // 监听禁用状态
  watch(disabled, value => {
    if (value && popupVisible.value) {
      popupVisible.value = false;
      onChange(false);
    }
  });

  // 组件销毁前清理
  onBeforeUnmount(() => {
    clearTimer();
  });

  watch(
    visible,
    value => {
      popupVisible.value = value;
    },
    { immediate: true }
  );

  return {
    popupVisible,
    handleClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handlePopupMouseEnter,
    handlePopupMouseLeave
  };
}
