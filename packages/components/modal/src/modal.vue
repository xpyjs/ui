<template>
  <Teleport :to="appendTo || 'body'" :disabled="!appendTo || !visible">
    <Transition
      :name="currentTransitionName"
      @before-enter="emit('show')"
      @after-enter="emit('shown')"
      @before-leave="emit('hide')"
      @after-leave="emit('hidden')"
    >
      <template v-if="visible">
        <div
          v-if="mask"
          class="x-modal"
          :style="{
            '--z-index': zIndex ?? zIndexModal
          }"
          @click.self="handleMaskClick"
        >
          <slot />
        </div>

        <slot v-else />
      </template>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, toRef, watch } from "vue";
import { type ModalProps, modalEmits } from "./props";
import { useModal } from "./useModal";
import { useEsc } from "@/hooks/useEsc";
import { useTransition } from "@/hooks/useTransition";
import "./style.ts";

const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
  appendTo: "body",
  esc: true,
  lockScroll: true,
  mask: true,
  maskClosable: true,
  fullscreen: false,
  zIndex: 4000,
  transitionName: "x-fade"
});
const emit = defineEmits(modalEmits);
const { zIndex: zIndexModal, handleVisibilityChange } = useModal({
  visible: toRef(props, "visible"),
  lockScroll: toRef(props, "lockScroll")
});

// 监听可见性变化
watch(
  () => props.visible,
  async val => {
    handleVisibilityChange(val);
  }
);

const handleMaskClick = () => {
  if (props.maskClosable) {
    emit("update:visible", false);
  }
};

useEsc(toRef(props, "visible"), toRef(props, "esc"), () =>
  emit("update:visible", false)
);

const { transitionName: currentTransitionName } = useTransition(
  computed(() => props.transitionName)
);
</script>
