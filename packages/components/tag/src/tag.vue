<template>
  <div
    :class="['x-tag', `x-tag--${type}`, `x-tag--${size}`, `x-tag--${variant}`]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 主要内容 -->
    <span class="x-tag__content">
      <slot></slot>
    </span>

    <!-- 关闭按钮 -->
    <span
      v-if="closable && (isHover || closeShowType === 'always')"
      class="x-tag__close"
      @click.stop="handleClose"
    >
      <slot name="close">
        <XIcon name="line-md:close" />
      </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { type TagProps, tagEmits } from "./props";

const props = withDefaults(defineProps<TagProps>(), {
  type: "default",
  size: "medium",
  variant: "filled",
  closable: false,
  closeShowType: "always"
});
const emits = defineEmits(tagEmits);

const handleClose = (e: MouseEvent) => {
  emits("close", e);
};

const isHover = ref(false);
const handleMouseEnter = () => {
  isHover.value = true;
};
const handleMouseLeave = () => {
  isHover.value = false;
};
</script>
