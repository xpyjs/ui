<template>
  <div class="x-color-panel">
    <!-- HSV 颜色面板 -->
    <ColorPanelHsv :color="currentColor" @update:color="handleColorChange" />

    <!-- 透明度滑块 -->
    <AlphaSlider
      v-if="showAlpha"
      :color="currentColor"
      :alpha="currentColor.a"
      @update:alpha="handleAlphaChange"
    />

    <!-- 颜色输入 -->
    <ColorInput
      v-if="showText"
      :color="currentColor"
      :show-alpha="showAlpha"
      @update:color="handleColorChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { RGBColor } from "@/utils/color";
import ColorPanelHsv from "./components/color-panel-hsv.vue";
import AlphaSlider from "./components/alpha-slider.vue";
import ColorInput from "./components/color-input.vue";

const props = defineProps<{
  color: RGBColor | null;
  showAlpha?: boolean;
  showText?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:color", color: RGBColor): void;
}>();

// 当前颜色
const currentColor = ref<RGBColor>({
  r: 255,
  g: 0,
  b: 0
});

// 监听外部颜色变化
watch(
  () => props.color,
  value => {
    if (value) {
      currentColor.value = value;
    }
  },
  { immediate: true }
);

// 处理颜色变化
const handleColorChange = (color: RGBColor) => {
  currentColor.value = color;
  emit("update:color", color);
};

// 处理透明度变化
const handleAlphaChange = (alpha: number) => {
  currentColor.value = {
    ...currentColor.value,
    a: alpha
  };
  emit("update:color", currentColor.value);
};
</script>
