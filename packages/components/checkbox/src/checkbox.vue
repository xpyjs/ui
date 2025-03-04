<template>
  <label
    :class="[
      'x-checkbox',
      {
        [`x-checkbox--${currentType}`]: currentType,
        [`x-checkbox--${currentSize}`]: currentSize,
        'x-checkbox--checked': indeterminate || isChecked,
        'x-checkbox--indeterminate': indeterminate,
        'x-checkbox--disabled': currentDisabled
      }
    ]"
  >
    <input
      type="checkbox"
      class="x-checkbox__input"
      :value="value"
      :checked="isChecked"
      :disabled="currentDisabled"
      @change="handleChange"
    />
    <span v-if="$slots.box" class="x-checkbox__inner--custom">
      <slot
        name="box"
        :checked="isChecked"
        :indeterminate="indeterminate"
        :disabled="currentDisabled"
      ></slot>
    </span>
    <span
      v-else
      :class="['x-checkbox__inner', { 'x-checkbox--dot': shape === 'dot' }]"
    ></span>
    <span v-if="$slots.default || label" class="x-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted } from "vue";
import { type CheckboxProps, checkboxEmits } from "./checkbox";
import { type CheckboxGroupContext } from "./type.ts";

defineOptions({
  name: "XCheckbox"
});

const props = defineProps<CheckboxProps>();
const emit = defineEmits(checkboxEmits);

// 注入 group 上下文
const checkboxGroup = inject<CheckboxGroupContext | null>(
  "checkbox-group",
  null
);

const currentSize = computed(
  () => checkboxGroup?.size?.value || props.size || "medium"
);
const currentType = computed(
  () => checkboxGroup?.type?.value || props.type || "default"
);
const currentDisabled = computed(
  () => checkboxGroup?.disabled?.value || props.disabled
);

const currentModelValue = computed(
  () => checkboxGroup?.modelValue?.value ?? props.modelValue
);

const isChecked = computed(() => {
  const modelValue = currentModelValue.value;
  if (Array.isArray(modelValue)) {
    return modelValue.includes(props.value);
  }
  return !!modelValue;
});

const handleChange = (event: Event) => {
  if (currentDisabled.value) return;
  const target = event.target as HTMLInputElement;
  const checked = target.checked;

  if (checkboxGroup) {
    const modelValue = [...(checkboxGroup.modelValue?.value || [])];
    const value = props.value;
    if (!value) return;

    const index = modelValue.indexOf(value);

    if (checked && index === -1) {
      modelValue.push(value);
    } else if (!checked && index > -1) {
      modelValue.splice(index, 1);
    }

    checkboxGroup.changeEvent?.(modelValue);
  } else {
    emit("update:modelValue", checked);
    emit("change", checked);
  }
};

// 在组件挂载时注册
onMounted(() => {
  if (checkboxGroup && props.value) {
    checkboxGroup.registerChild?.(props.value);
  }
});

// 在组件卸载时注销
onUnmounted(() => {
  if (checkboxGroup && props.value) {
    checkboxGroup.unregisterChild?.(props.value);
  }
});
</script>
