<template>
  <div class="x-alpha-slider">
    <div
      ref="sliderRef"
      class="x-alpha-slider__track"
      :style="{
        background: `linear-gradient(to right, transparent, ${formatColor(
          color
        )})`
      }"
      @mousedown="handleMouseDown"
    >
      <div
        class="x-alpha-slider__thumb"
        :style="{ left: `${(alpha ?? 1) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useEventListener } from "@/hooks/useEvent";
import { formatColor, type RGBColor } from "@/utils/color";

const props = defineProps<{
  color: RGBColor;
  alpha?: number | null;
}>();

const emit = defineEmits<{
  (e: "update:alpha", alpha: number): void;
}>();

const sliderRef = ref<HTMLElement>();
const isDragging = ref(false);

// 处理滑块拖拽
const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  updatePosition(e);
};

// 更新位置
const updatePosition = (e: MouseEvent) => {
  if (!sliderRef.value) return;

  const rect = sliderRef.value.getBoundingClientRect();
  const left = e.clientX - rect.left;
  const alpha = Math.max(0, Math.min(1, left / rect.width));

  emit("update:alpha", alpha);
};

// 处理拖拽
useEventListener(window, "mousemove", e => {
  if (!isDragging.value) return;
  updatePosition(e);
});

useEventListener(window, "mouseup", () => {
  isDragging.value = false;
});
</script>
