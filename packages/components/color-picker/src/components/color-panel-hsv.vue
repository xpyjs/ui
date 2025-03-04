<template>
  <div class="x-color-panel-hsv">
    <!-- HSV 颜色面板 -->
    <div
      ref="panelRef"
      class="x-color-panel-hsv__main"
      :style="{
        backgroundColor:
          formatColor(hsvToRgb({ h: hsv.h, s: 100, v: 100 })) || ''
      }"
      @mousedown="handlePanelMouseDown"
    >
      <div
        class="x-color-panel-hsv__cursor"
        :style="{
          left: `${hsv.s}%`,
          top: `${100 - hsv.v}%`
        }"
      ></div>
    </div>

    <!-- 色相滑块 -->
    <div class="x-color-panel-hsv__hue">
      <div
        ref="hueRef"
        class="x-color-panel-hsv__hue-track"
        @mousedown="handleHueMouseDown"
      >
        <div
          class="x-color-panel-hsv__hue-thumb"
          :style="{ left: `${(hsv.h / 360) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useEventListener } from "@/hooks/useEvent";
import {
  formatColor,
  hsvToRgb,
  rgbToHsv,
  type RGBColor,
  isSameColor
} from "@/utils/color";

const props = defineProps<{
  color: RGBColor;
}>();

const emit = defineEmits<{
  (e: "update:color", color: RGBColor): void;
}>();

// 转换为 HSV 格式便于操作
const hsv = ref(rgbToHsv(props.color));

// 监听外部颜色变化
watch(
  () => props.color,
  value => {
    // 添加对比，避免无限循环
    const newHsv = rgbToHsv(value);
    if (!isSameColor(hsv.value, newHsv)) {
      hsv.value = newHsv;
    }
  }
);

// 监听内部颜色变化
watch(
  hsv,
  value => {
    const newColor = hsvToRgb(value);
    // 添加对比，避免无限循环
    if (!isSameColor(newColor, props.color)) {
      emit("update:color", newColor);
    }
  },
  { deep: true }
);

// 面板拖拽相关
const panelRef = ref<HTMLElement>();
const hueRef = ref<HTMLElement>();
const isDragging = ref(false);
const dragType = ref<"panel" | "hue">("panel");

// 处理面板拖拽
const handlePanelMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  dragType.value = "panel";
  updatePanelPosition(e);
};

// 处理色相滑块拖拽
const handleHueMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  dragType.value = "hue";
  updateHuePosition(e);
};

// 更新面板位置
const updatePanelPosition = (e: MouseEvent) => {
  if (!panelRef.value) return;

  const rect = panelRef.value.getBoundingClientRect();
  const left = e.clientX - rect.left;
  const top = e.clientY - rect.top;

  hsv.value.s = Math.round(
    Math.max(0, Math.min(100, (left / rect.width) * 100))
  );
  hsv.value.v = Math.round(
    Math.max(0, Math.min(100, 100 - (top / rect.height) * 100))
  );
};

// 更新色相位置
const updateHuePosition = (e: MouseEvent) => {
  if (!hueRef.value) return;

  const rect = hueRef.value.getBoundingClientRect();
  const left = e.clientX - rect.left;

  hsv.value.h = Math.round(
    Math.max(0, Math.min(360, (left / rect.width) * 360))
  );
};

// 处理拖拽
useEventListener(window, "mousemove", e => {
  if (!isDragging.value) return;

  if (dragType.value === "panel") {
    updatePanelPosition(e);
  } else {
    updateHuePosition(e);
  }
});

useEventListener(window, "mouseup", () => {
  isDragging.value = false;
});
</script>
