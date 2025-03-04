<template>
  <div
    :class="[
      'x-collapse-group',
      `x-collapse-group--${direction}`,
      {
        'x-collapse-group--accordion': accordion
      }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, computed, toRef } from "vue";
import { type CollapseGroupProps, collapseGroupEmits } from "./collapse-group";
import type { CollapseGroupContext } from "./collapse-group";

defineOptions({
  name: "XCollapseGroup"
});

const props = withDefaults(defineProps<CollapseGroupProps>(), {
  active: "",
  modelValue: () => [],
  accordion: false,
  direction: "vertical"
});
const emit = defineEmits(collapseGroupEmits);

// 当前激活的面板
const activeList = computed(() => {
  if (props.accordion) {
    return props.active ? [props.active] : [];
  }
  return props.modelValue;
});

// 处理面板点击
const handleItemClick = (name: string | number) => {
  if (props.accordion) {
    // 手风琴模式下,点击当前激活的面板时关闭它
    const newActive = props.active === name ? "" : name;
    emit("update:active", newActive);
    emit("change", newActive);
  } else {
    const index = activeList.value.indexOf(name);
    const newActiveList = [...activeList.value];

    if (index > -1) {
      newActiveList.splice(index, 1);
    } else {
      newActiveList.push(name);
    }

    emit("update:modelValue", newActiveList);
    emit("change", newActiveList);
  }
};

// 提供上下文
provide<CollapseGroupContext>("collapseGroupContext", {
  active: computed(() => props.active),
  activeList: toRef(activeList.value),
  accordion: computed(() => props.accordion),
  direction: computed(() => props.direction),
  handleItemClick
});
</script>
