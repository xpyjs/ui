<template>
  <div
    :class="[
      'x-radio-button-group',
      {
        'x-radio-button-group--disabled': disabled
      }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, toRef } from "vue";
import {
  type RadioButtonGroupProps,
  radioButtonGroupEmits
} from "./radio-button-group";
import { type RadioButtonGroupContext } from "./type";

defineOptions({
  name: "XRadioButtonGroup"
});

const props = withDefaults(defineProps<RadioButtonGroupProps>(), {
  type: "default",
  size: "medium",
  modelValue: undefined,
  disabled: false
});
const emit = defineEmits(radioButtonGroupEmits);

// 提供给子组件的上下文
provide<RadioButtonGroupContext>("radio-group", {
  name: "radioButtonGroup",
  modelValue: toRef(props, "modelValue"),
  disabled: toRef(props, "disabled"),
  size: toRef(props, "size"),
  type: toRef(props, "type"),
  changeEvent: (value: string | number | boolean) => {
    emit("update:modelValue", value);
    emit("change", value);
  }
});
</script>
