<template>
  <a
    :class="[
      'x-link',
      `x-link--${type}`,
      {
        'x-link--underline': underline,
        'x-link--disabled': disabled
      }
    ]"
    :href="disabled ? undefined : href"
    :target="disabled ? undefined : target"
    @click="handleClick"
  >
    <!-- 前置图标 -->
    <span v-if="$slots.icon" class="x-link__icon">
      <slot name="icon"></slot>
    </span>

    <!-- 默认内容 -->
    <span class="x-link__content">
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts" setup>
import { type LinkProps, linkEmits } from "./props";

defineOptions({
  name: "XLink"
});

const props = withDefaults(defineProps<LinkProps>(), {
  type: "default",
  href: "#"
});

const emit = defineEmits(linkEmits);

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit("click", event);
};
</script>
