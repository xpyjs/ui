<template>
  <XLoadingAnimation
    type="wave"
    :size="size"
    :color="color"
    :custom-class="customClass"
  >
    <div class="x-loading-wave">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </XLoadingAnimation>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XLoadingAnimation from "./base.vue";
import { animationProps } from "./props";

export default defineComponent({
  name: "XLoadingWave",
  components: { XLoadingAnimation },
  props: animationProps
});
</script>
