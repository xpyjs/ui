<template>
  <div
    :class="[
      'x-switch',
      `x-switch--${type}`,
      `x-switch--${size}`,
      {
        'x-switch--checked': modelValue,
        'x-switch--disabled': disabled
      }
    ]"
    :style="switchStyle"
    @click="handleClick"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="disabled"
    tabindex="0"
    @keydown.space.prevent="handleClick"
    @keydown.enter.prevent="handleClick"
  >
    <!-- 关闭状态文本 -->
    <span v-if="inactiveText" class="x-switch__text x-switch__text--inactive">
      {{ inactiveText }}
    </span>

    <!-- 开关轨道 -->
    <div class="x-switch__track">
      <!-- 开关按钮 -->
      <div class="x-switch__button">
        <!-- 激活状态图标 -->
        <template v-if="modelValue">
          <slot v-if="$slots.activeIcon" name="activeIcon" />
          <x-icon
            v-else-if="activeIcon"
            :name="activeIcon"
            class="x-switch__icon"
          />
        </template>

        <!-- 未激活状态图标 -->
        <template v-else>
          <slot v-if="$slots.inactiveIcon" name="inactiveIcon" />
          <x-icon
            v-else-if="inactiveIcon"
            :name="inactiveIcon"
            class="x-switch__icon"
          />
        </template>
      </div>
    </div>

    <!-- 打开状态文本 -->
    <span v-if="activeText" class="x-switch__text x-switch__text--active">
      {{ activeText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { type SwitchProps, switchEmits } from "./props";
import XIcon from "../../icon";

defineOptions({
  name: "XSwitch"
});

const props = withDefaults(defineProps<SwitchProps>(), {
  type: "default",
  size: "medium",
  modelValue: false,
  disabled: false
});
const emit = defineEmits(switchEmits);

const switchStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.modelValue && props.activeColor) {
    style["--x-switch-active-color"] = props.activeColor;
  }
  if (!props.modelValue && props.inactiveColor) {
    style["--x-switch-inactive-color"] = props.inactiveColor;
  }
  return style;
});

const handleClick = () => {
  if (props.disabled) return;
  const newValue = !props.modelValue;
  emit("update:modelValue", newValue);
  emit("change", newValue);
};
</script>
