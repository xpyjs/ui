<template>
  <XLoadingAnimation
    type="snake"
    :size="size"
    :color="color"
    :custom-class="customClass"
  >
    <div class="x-loading-snake">
      <div class="x-loading-snake__body"></div>
    </div>
  </XLoadingAnimation>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XLoadingAnimation from "./base.vue";
import { animationProps } from "./props";

export default defineComponent({
  name: "XLoadingSnake",
  components: { XLoadingAnimation },
  props: animationProps
});
</script>
