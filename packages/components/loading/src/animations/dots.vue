<template>
  <XLoadingAnimation
    type="dots"
    :size="size"
    :color="color"
    :custom-class="customClass"
  >
    <div class="x-loading-dots">
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
  name: "XLoadingDots",
  components: { XLoadingAnimation },
  props: animationProps
});
</script>
