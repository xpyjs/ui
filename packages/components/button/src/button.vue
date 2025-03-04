<template>
  <button
    :class="[
      'x-button',
      `x-button--${type || 'default'}`,
      `x-button--${variant || 'filled'}`,
      `x-button--${shape || 'default'}`,
      `x-button--${size || 'medium'}`,
      {
        'x-button--flat': flat,
        'x-button--disabled': disabled,
        'x-button--loading': loading
      }
    ]"
    :disabled="disabled || loading"
    v-ripple="{
      disabled: !ripple || variant === 'text' || disabled || loading
    }"
    v-loading="[loading ?? false, loadingOptions ?? {}]"
    @click="handleClick"
    @mousedown="handleLongPress"
    @mouseup="clearLongPress"
    @mouseleave="clearLongPress"
  >
    <!-- 前置图标 -->
    <span v-if="$slots.icon" class="x-button__icon">
      <slot name="icon"></slot>
    </span>

    <!-- 默认内容 -->
    <span class="x-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { vRipple } from "@/directives/ripple/index.ts";
import { vLoading } from "@/directives/loading/index.ts";
import { buttonEmits, type ButtonProps } from "./props";

defineOptions({
  name: "XButton"
});

const props = withDefaults(defineProps<ButtonProps>(), {
  ripple: true,
  loading: false,
  disabled: false,
  flat: false,
  type: "default",
  variant: "filled",
  shape: "default"
});
const emit = defineEmits(buttonEmits);

const longPressTimer = ref<number | null>(null);

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit("click", event);
};

const handleLongPress = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;

  longPressTimer.value = window.setTimeout(() => {
    emit("longpress", event);
  }, 500);
};

const clearLongPress = () => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value);
    longPressTimer.value = null;
  }
};
</script>
