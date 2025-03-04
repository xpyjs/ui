<template>
  <label
    :class="[
      'x-radio',
      `x-radio--${type}`,
      `x-radio--${size}`,
      {
        'x-radio--checked': isChecked,
        'x-radio--disabled': disabled
      }
    ]"
  >
    <input
      type="radio"
      class="x-radio__input"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="x-radio__inner"></span>
    <span v-if="$slots.default || label" class="x-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { type RadioProps, radioEmits } from "./props";

defineOptions({
  name: "XRadio"
});

const props = withDefaults(defineProps<RadioProps>(), {
  type: "default",
  size: "medium"
});
const emit = defineEmits(radioEmits);

const isChecked = computed(() => {
  return props.modelValue === props.value;
});

const handleChange = (event: Event) => {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  const value = target.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
