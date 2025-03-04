<template>
  <label
    :class="[
      'x-radio-button',
      {
        [`x-radio-button--${currentType}`]: currentType,
        [`x-radio-button--${currentSize}`]: currentSize,
        'x-radio-button--checked': isChecked,
        'x-radio-button--disabled': currentDisabled
      }
    ]"
  >
    <input
      type="radio"
      class="x-radio-button__input"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="x-radio-button__inner">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { type RadioButtonProps, radioButtonEmits } from "./radio-button";
import { type RadioButtonGroupContext } from "./type";

defineOptions({
  name: "XRadioButton"
});

const props = withDefaults(defineProps<RadioButtonProps>(), {
  type: "default",
  size: "medium",
  disabled: false
});
const emit = defineEmits(radioButtonEmits);

// 注入 group 上下文
const radioGroup = inject<RadioButtonGroupContext | null>("radio-group", null);

const currentSize = computed(() => radioGroup?.size?.value || props.size);
const currentType = computed(() => radioGroup?.type?.value || props.type);

const currentDisabled = computed(
  () => radioGroup?.disabled?.value || props.disabled
);

const currentModelValue = computed(
  () => radioGroup?.modelValue?.value ?? props.modelValue
);

const isChecked = computed(() => {
  return currentModelValue.value === props.value;
});

const handleChange = (event: Event) => {
  if (currentDisabled.value) return;
  const target = event.target as HTMLInputElement;
  const value = target.value;
  if (radioGroup) {
    radioGroup.changeEvent?.(value);
  } else {
    emit("update:modelValue", value);
    emit("change", value);
  }
};
</script>
