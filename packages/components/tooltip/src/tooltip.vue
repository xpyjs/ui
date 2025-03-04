<template>
  <XPopup
    trigger="hover"
    :placement="placement"
    :offset="offset"
    :align-width="false"
    :show-arrow="showArrow"
    :show-delay="showDelay"
    :hide-delay="enterable ? Math.max(200, hideDelay) : hideDelay"
    :disabled="disabled"
    :enterable="enterable"
    :popup-class="`x-tooltip ${props.inverse ? 'x-tooltip--inverse' : ''}`"
  >
    <slot />
    <template #content>
      <template v-for="line in textList" :key="line">
        <div>{{ line }}</div>
      </template>
    </template>
  </XPopup>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { XPopup } from "../../popup";
import { type TooltipProps, tooltipEmits } from "./props";

defineOptions({
  name: "XTooltip",
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipProps>(), {
  content: "",
  inverse: false,
  showDelay: 200,
  hideDelay: 0,
  enterable: false,
  placement: "top"
});
const emit = defineEmits(tooltipEmits);

const textList = computed(() => {
  if (!props.content) return [];
  return props.content.replace(/\\n/g, "\n").split("\n");
});
</script>
