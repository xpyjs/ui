<template>
  <div
    :class="[
      'x-loading-animation',
      `x-loading-animation--${type}`,
      customClass
    ]"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { animationProps } from "./props";

export default defineComponent({
  name: "XLoadingAnimation",
  props: animationProps,
  setup(props) {
    const style = {
      width: typeof props.size === "number" ? `${props.size}px` : props.size,
      height: typeof props.size === "number" ? `${props.size}px` : props.size,
      color: props.color
    };

    return { style };
  }
});
</script>
