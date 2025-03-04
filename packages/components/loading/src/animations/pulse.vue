<template>
  <XLoadingAnimation
    type="pulse"
    :size="size"
    :color="color"
    :custom-class="customClass"
  >
    <div class="x-loading-pulse">
      <div class="x-loading-pulse__ring"></div>
    </div>
  </XLoadingAnimation>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XLoadingAnimation from "./base.vue";
import { animationProps } from "./props";

export default defineComponent({
  name: "XLoadingPulse",
  components: { XLoadingAnimation },
  props: animationProps
});
</script>
