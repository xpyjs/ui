<template>
  <div
    :class="[
      'x-input',
      `x-input--${size}`,
      {
        'x-input--disabled': disabled,
        'x-input--readonly': readonly,
        [`x-input--${status}`]: status
      }
    ]"
    @click="handleClick"
  >
    <!-- 前置内容 -->
    <div v-if="$slots.prepend" class="x-input__prepend">
      <slot name="prepend"></slot>
    </div>

    <div class="x-input__wrapper">
      <!-- 前缀图标 -->
      <span v-if="$slots.prefix" class="x-input__prefix">
        <slot name="prefix"></slot>
      </span>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        :class="['x-input__inner']"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 清除按钮 -->
      <span
        v-if="clearable && !disabled && !readonly && modelValue"
        class="x-input__suffix x-input__clear"
        @click="handleClear"
      >
        <slot name="clear-icon">
          <XIcon name="line-md:close" />
        </slot>
      </span>

      <!-- 后缀图标 -->
      <span v-if="$slots.suffix" class="x-input__suffix">
        <slot name="suffix"></slot>
      </span>
    </div>

    <!-- 后置内容 -->
    <div v-if="$slots.append" class="x-input__append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { XIcon } from "../../icon/index";
import { type InputProps, inputEmits } from "./props";

defineOptions({
  name: "XInput"
});

const props = withDefaults(defineProps<InputProps>(), {
  size: "medium",
  type: "text"
});

const emit = defineEmits(inputEmits);
const inputRef = ref<HTMLInputElement>();
defineExpose({
  inputRef
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // 处理 maxLength 限制
  if (props.maxLength !== undefined) {
    value = value.slice(0, Number(props.maxLength));
  }

  emit("update:modelValue", value);
  emit("input", value, event);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", target.value, event);
};

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const handleClear = () => {
  emit("update:modelValue", "");
  emit("clear");
  inputRef.value?.focus();
};

const handleClick = (e: Event) => {
  if (props.disabled) {
    e.stopPropagation();
    e.preventDefault();
  }
};
</script>
