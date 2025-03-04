<template>
  <div
    :class="[
      'x-tabs__nav-item',
      {
        'x-tabs__nav-item--active': active,
        'x-tabs__nav-item--disabled': item.disabled
      }
    ]"
    @click="handleClick"
  >
    <x-icon v-if="item.icon" :name="item.icon" class="x-tabs__nav-item-icon" />
    <span class="x-tabs__nav-item-text">{{ item.label }}</span>
    <x-icon
      v-if="closable"
      name="mdi:close"
      class="x-tabs__nav-item-close"
      @click.stop="handleClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { XIcon } from "@/components/icon";
import type { TabItem } from "./props";

const props = defineProps<{
  item: TabItem;
  active: boolean;
  closable?: boolean;
}>();

const emit = defineEmits<{
  click: [item: TabItem];
  close: [item: TabItem];
}>();

const handleClick = () => emit("click", props.item);
const handleClose = () => emit("close", props.item);
</script>
