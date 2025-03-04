<template>
  <div
    :class="[
      'x-color-picker',
      {
        'x-color-picker--inline': inline
      }
    ]"
  >
    <!-- 颜色面板 -->
    <XPopup v-if="!inline" trigger="click" :show-arrow="false">
      <div
        :class="['x-color-picker__trigger', `x-color-picker__trigger--${size}`]"
      >
        <div
          class="x-color-picker__preview"
          :style="{
            backgroundColor: bgColor,
            '--trans-opacity': 1 - (currentColor?.a ?? 1)
          }"
        ></div>
      </div>

      <template #content>
        <div class="x-color-picker__panel">
          <ColorPanel
            v-model:color="currentColor"
            :show-alpha="showAlpha"
            :show-text="showText"
          />
        </div>
      </template>
    </XPopup>

    <!-- 内联模式 -->
    <template v-else>
      <div class="x-color-picker__panel">
        <ColorPanel
          v-model:color="currentColor"
          :show-alpha="showAlpha"
          :show-text="showText"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { XPopup } from "../../popup";
import { type ColorPickerProps, colorPickerEmits } from "./props";
import ColorPanel from "./color-panel.vue";
import { formatColor, parseColor, type RGBColor } from "@/utils/color";

defineOptions({
  name: "XColorPicker"
});

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: null,
  showAlpha: true,
  showText: true,
  format: "hex",
  inline: false,
  size: "medium"
});

const emit = defineEmits(colorPickerEmits);

const currentColor = ref<RGBColor | null>(null);

// 监听内部颜色变化
watch(currentColor, value => {
  emit("update:modelValue", formatColor(value, props.format));
  emit("change", formatColor(value, props.format));
});

// 监听外部颜色变化
watch(
  () => props.modelValue,
  value => {
    currentColor.value = parseColor(value);
  },
  { immediate: true }
);

const bgColor = computed(
  () => formatColor(currentColor.value) || "transparent"
);
</script>
