<template>
  <!-- 菜单项 -->
  <li
    :class="[
            'x-menu-item',
            {
              'x-menu-item--disabled': item.disabled,
              'x-menu-item--hidden': item.hidden,
              [item.class!]: item.class
            }
          ]"
    :style="item.style"
    @click="handleClick(item)"
  >
    <!-- 图标 -->
    <x-icon v-if="item.icon" :name="item.icon" class="x-menu-item__icon" />

    <!-- 文本 -->
    <span class="x-menu-item__label">{{ item.label }}</span>

    <!-- 子菜单图标 -->
    <x-icon
      v-if="item.children?.length"
      name="mdi:chevron-right"
      class="x-menu-item__arrow"
    />
  </li>
</template>

<script lang="ts" setup>
import type { MenuItem } from "@/types/menu";

defineProps<{
  item: MenuItem;
}>();

const emit = defineEmits<{
  select: [item: MenuItem];
}>();

const handleClick = (item: MenuItem) => {
  if (item.disabled) return;
  if (!item.children?.length) {
    emit("select", item);
  }
};
</script>
