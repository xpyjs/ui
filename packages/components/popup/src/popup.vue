<template>
  <div
    ref="triggerRef"
    class="x-popup-trigger"
    @click="handleTriggerClick"
    @mouseenter="handleTriggerMouseEnter"
    @mouseleave="handleTriggerMouseLeave"
    @focus="handleTriggerFocus"
    @blur="handleTriggerBlur"
    @contextmenu="handleTriggerContextMenu"
  >
    <slot></slot>
  </div>

  <teleport :to="appendTo || 'body'" :disabled="!appendTo || !popupVisible">
    <transition
      :name="`${currentTransitionName}`"
      @before-enter="$emit('show')"
      @after-enter="$emit('shown')"
      @before-leave="$emit('hide')"
      @after-leave="$emit('hidden')"
    >
      <div
        v-if="popupVisible"
        ref="popupRef"
        :class="[
          'x-popup',
          `x-popup--${actualPlacement}`,
          { 'x-popup__arrow': showArrow },
          popupClass
        ]"
        :style="[innerPopupStyle, popupStyle]"
        @mouseenter="handlePopupMouseEnter"
        @mouseleave="handlePopupMouseLeave"
      >
        <div class="x-popup__content">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, toRef } from "vue";
import { type PopupProps, popupEmits } from "./props";
import { usePosition } from "./hooks/usePosition";
import { useTrigger } from "./hooks/useTrigger";
import { useZIndex } from "@/hooks/useZIndex";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEsc } from "@/hooks/useEsc";
import { useFocus } from "./hooks/useFocus";
import { unrefElement } from "@/utils/dom/unrefElement";
import { warn } from "@/utils/console";
import { useModal } from "@/components/modal/src/useModal";
import { useTransition } from "@/hooks/useTransition";

defineOptions({
  name: "XPopup"
});

const props = withDefaults(defineProps<PopupProps>(), {
  visible: false,
  trigger: "click",
  reference: null,
  placement: "bottom",
  offset: 8,
  showArrow: true,
  transitionName: "x-fade",
  showDelay: 100,
  hideDelay: 100,
  disabled: false,
  hideOnClick: true,
  enterable: true,
  appendTo: "body",
  esc: true,
  lockScroll: false,
  autoFocus: true,
  restoreFocus: true,
  alignWidth: true,
  popupClass: "",
  popupStyle: ""
});

const emit = defineEmits(popupEmits);

const triggerRef = ref<Element>();
const realTriggerRef = computed(() => {
  if (props.reference) {
    const _ref = unrefElement(props.reference);
    if (_ref) return _ref;

    warn(
      "XPopup",
      "Trigger reference is not a valid element. The reference is",
      props.reference
    );
  }
  return triggerRef.value;
});

const popupRef = ref<HTMLElement>();
const {
  popupVisible,
  handleClick: handleTriggerClick,
  handleContextMenu: handleTriggerContextMenu,
  handleMouseEnter: handleTriggerMouseEnter,
  handleMouseLeave: handleTriggerMouseLeave,
  handleFocus: handleTriggerFocus,
  handleBlur: handleTriggerBlur,
  handlePopupMouseEnter,
  handlePopupMouseLeave
} = useTrigger(
  computed(() => props.visible),
  computed(() => props.trigger),
  computed(() => props.disabled),
  computed(() => props.enterable),
  {
    showDelay: props.showDelay,
    hideDelay: props.hideDelay,
    onChange: value => emit("update:visible", value)
  }
);

const { position, updatePosition, actualPlacement } = usePosition(
  realTriggerRef,
  popupRef,
  computed(() => props.placement),
  computed(() => props.offset)
);
const { zIndex, generateZIndex, resetZIndex } = useZIndex();
const { handleVisibilityChange } = useModal({
  visible: toRef(() => props.visible),
  lockScroll: toRef(props, "lockScroll")
});
useClickOutside([realTriggerRef, popupRef, triggerRef], e => {
  if (props.hideOnClick) {
    popupVisible.value = false;
    emit("update:visible", false);
    emit("click-outside", e);
  }
});

const { transitionName: currentTransitionName } = useTransition(
  computed(() => props.transitionName)
);

const innerPopupStyle = computed(() => ({
  zIndex: zIndex.value,
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
  minWidth: props.alignWidth ? `${realTriggerRef.value?.clientWidth}px` : ""
}));

watch(
  () => props.visible,
  async val => {
    handleVisibilityChange(val);
    if (val) {
      generateZIndex();
      updatePosition();
    } else {
      resetZIndex();
    }
  }
);

// 键盘交互
useEsc(
  popupVisible,
  computed(() => props.esc),
  () => {
    popupVisible.value = false;
    emit("update:visible", false);
  }
);

// 焦点管理
const { focusFirstElement, savePreviousFocus, restorePreviousFocus } = useFocus(
  realTriggerRef,
  popupRef,
  popupVisible
);

// 监听可见性变化处理焦点
watch(popupVisible, value => {
  if (value) {
    if (props.autoFocus) {
      savePreviousFocus();
      nextTick(() => {
        focusFirstElement(popupRef.value!);
      });
    }
  } else {
    if (props.restoreFocus) {
      restorePreviousFocus();
    }
  }
});

defineExpose({
  triggerRef,
  popupRef
});
</script>
