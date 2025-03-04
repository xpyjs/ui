<template>
  <XInput
    ref="inputRef"
    :class="['x-input-number']"
    :model-value="displayValue"
    :placeholder="placeholder"
    :size="size"
    :status="status"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    type="text"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @clear="handleClear"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { XInput, type XInputInstance } from "../../input";
import { type InputNumberProps, inputNumberEmits } from "./props";

defineOptions({
  name: "XInputNumber",
  inheritAttrs: false
});

const props = withDefaults(defineProps<InputNumberProps>(), {
  size: "medium",
  min: -Infinity,
  max: Infinity
});
const emit = defineEmits(inputNumberEmits);
const inputRef = ref<XInputInstance>();

// 显示值
const displayValue = ref("");
watch(
  () => props.modelValue,
  value => {
    if (value === null || value === undefined) {
      displayValue.value = "";
    } else {
      displayValue.value =
        props.precision !== undefined
          ? value.toFixed(props.precision)
          : value.toString();
    }
  },
  { immediate: true }
);

watch(displayValue, value => {
  emit("update:modelValue", !value ? null : parseFloat(value));
});

// 变更事件
const handleChange = (value: string, evt: Event) => {
  // 空值或非数字处理
  if (!value || isNaN(parseFloat(value))) {
    displayValue.value = "";
    emit("change", null, evt);
    return;
  }

  const num = parseFloat(value);
  const limitedNum = Math.min(Math.max(num, props.min), props.max);
  const finalNum =
    props.precision !== undefined
      ? Number(limitedNum.toFixed(props.precision))
      : limitedNum;

  displayValue.value = finalNum.toString();
  emit("change", finalNum, evt);
};

// 聚焦事件
const handleFocus = (evt: FocusEvent) => {
  emit("focus", evt);
};

// 失焦事件
const handleBlur = (evt: FocusEvent) => {
  inputRef.value?.inputRef &&
    (inputRef.value.inputRef.value = displayValue.value);
  emit("blur", evt);
};

// 清除事件
const handleClear = () => {
  displayValue.value = "";
  emit("update:modelValue", null);
  emit("clear");
};
</script>
