<template>
  <div
    :class="[
      'x-checkbox-group',
      `x-checkbox-group--${direction ?? 'horizontal'}`,
      {
        'x-checkbox-group--disabled': disabled
      }
    ]"
    :style="{
      '--x-checkbox-group-gap': typeof gap === 'number' ? `${gap}px` : gap
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch, computed } from "vue";
import { type CheckboxGroupProps, checkboxGroupEmits } from "./checkbox-group";
import { type CheckboxGroupContext } from "./type";

defineOptions({
  name: "XCheckboxGroup"
});

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => []
});
const emit = defineEmits(checkboxGroupEmits);

// 存储子组件的值列表
const childValues = ref<(string | number)[]>([]);

// 注册子组件
const registerChild = (value: string | number) => {
  if (value && !childValues.value.includes(value)) {
    childValues.value.push(value);
  }
};

// 注销子组件
const unregisterChild = (value: string | number) => {
  const index = childValues.value.indexOf(value);
  if (index > -1) {
    childValues.value.splice(index, 1);
  }
};

// 监听选中值变化,更新全选状态
watch(
  () => props.modelValue,
  newValue => {
    const selectedCount = newValue?.length ?? 0;
    const totalCount = childValues.value.length;

    // 全部选中
    if (totalCount > 0 && selectedCount === totalCount) {
      emit("update:all", true);
    }
    // 部分选中
    else if (selectedCount > 0) {
      emit("update:all", null);
    }
    // 全部未选中
    else {
      emit("update:all", false);
    }
  },
  { immediate: true }
);

// 监听全选状态变化
watch(
  () => props.all,
  newValue => {
    if (newValue === true) {
      // 全选
      emit("update:modelValue", [...childValues.value]);
      emit("change", [...childValues.value]);
    } else if (newValue === false) {
      // 全不选
      emit("update:modelValue", []);
      emit("change", []);
    }
  }
);

// 提供给子组件的上下文
provide<CheckboxGroupContext>("checkbox-group", {
  name: "checkboxGroup",
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  size: computed(() => props.size ?? "medium"),
  type: computed(() => props.type ?? "default"),
  direction: computed(() => props.direction ?? "horizontal"),
  gap: computed(() => props.gap ?? 0),
  registerChild,
  unregisterChild,
  changeEvent: value => {
    emit("update:modelValue", value);
    emit("change", value);
  }
});
</script>
