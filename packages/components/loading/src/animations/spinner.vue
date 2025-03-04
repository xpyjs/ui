<template>
  <XLoadingAnimation
    type="spinner"
    :size="size"
    :color="color"
    :custom-class="customClass"
  >
    <div class="x-loading-spinner">
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          stroke-width="5"
        />
      </svg>
    </div>
  </XLoadingAnimation>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XLoadingAnimation from "./base.vue";
import { animationProps } from "./props";

export default defineComponent({
  name: "XLoadingSpinner",
  components: { XLoadingAnimation },
  props: animationProps
});
</script>
