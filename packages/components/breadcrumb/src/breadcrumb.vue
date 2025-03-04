<template>
  <nav class="x-breadcrumb" aria-label="breadcrumb">
    <ol class="x-breadcrumb__list">
      <li
        v-for="(item, index) in _items"
        :key="index"
        :class="[
          'x-breadcrumb__item',
          item.class,
          {
            'x-breadcrumb__item--disabled': item.disabled,
            'x-breadcrumb__item--link':
              !item.disabled && (item.to || item.action)
          }
        ]"
      >
        <!-- 传递 type 给 Link 组件 -->
        <x-link
          v-if="(item.to || item.action) && !item.disabled"
          :href="item.to"
          :type="type"
          :disabled="item.disabled"
          class="x-breadcrumb__link"
          @click="handleClick(item)"
        >
          {{ item.label }}

          <template #icon>
            <!-- 图标 -->
            <x-icon v-if="item.icon" :name="item.icon" />
          </template>
        </x-link>
        <span v-else class="x-breadcrumb__text">
          <x-icon
            v-if="item.icon"
            :name="item.icon"
            class="x-breadcrumb__icon"
          />
          {{ item.label }}
        </span>

        <!-- 分隔符 -->
        <span v-if="index < _items.length - 1" class="x-breadcrumb__separator">
          <x-icon v-if="separatorIcon" :name="separatorIcon" />
          <span v-else>{{ separator ?? "›" }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { XIcon } from "@/components/icon";
import { XLink } from "@/components/link";
import {
  breadcrumbEmits,
  type BreadcrumbProps,
  type BreadcrumbItem
} from "./props";
import { computed, withDefaults } from "vue";

defineOptions({
  name: "XBreadcrumb"
});

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  type: "default",
  items: () => [],
  separator: "›",
  separatorIcon: ""
});

const emit = defineEmits(breadcrumbEmits);

const _items = computed(() => props.items ?? []);

const handleClick = (item: BreadcrumbItem) => {
  if (!item.disabled) {
    item.action?.();
    emit("click", item);
  }
};
</script>
