<template>
  <div
    ref="scrollRef"
    :class="[
      'x-scroll',
      `x-scroll--${scrollbarType}`,
      { 'x-scroll--scrolling': isScrolling }
    ]"
    :style="{
      '--x-bar-size': `${size}px`,
      '--x-track-color': trackColor,
      '--x-thumb-color': thumbColor,
      '--x-thumb-hover-color': thumbHoverColor
    }"
  >
    <div
      ref="contentRef"
      class="x-scroll__content"
      :class="contentClass"
      :style="contentStyle"
      @scroll="handleScroll"
    >
      <slot></slot>
    </div>

    <!-- 水平滚动条 -->
    <div
      v-if="showHorizontalBar"
      ref="horizontalBarRef"
      class="x-scroll__bar x-scroll__bar--horizontal"
      :style="{ zIndex: horizontalBarZIndex }"
      @click.prevent.stop
      @mousedown="handleTrackClick('horizontal', $event)"
      @mouseenter="handleBarMouseEnter('horizontal')"
    >
      <div
        ref="horizontalThumbRef"
        class="x-scroll__thumb x-scroll__thumb--horizontal"
        :style="{
          width: `${horizontalThumbWidth}px`,
          transform: `translateX(${horizontalThumbLeft}px)`
        }"
        @mousedown="handleThumbMouseDown('horizontal', $event)"
      ></div>
    </div>

    <!-- 垂直滚动条 -->
    <div
      v-if="showVerticalBar"
      ref="verticalBarRef"
      class="x-scroll__bar x-scroll__bar--vertical"
      :style="{ zIndex: verticalBarZIndex }"
      @click.prevent.stop
      @mousedown="handleTrackClick('vertical', $event)"
      @mouseenter="handleBarMouseEnter('vertical')"
    >
      <div
        ref="verticalThumbRef"
        class="x-scroll__thumb x-scroll__thumb--vertical"
        :style="{
          height: `${verticalThumbHeight}px`,
          transform: `translateY(${verticalThumbTop}px)`
        }"
        @mousedown="handleThumbMouseDown('vertical', $event)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { type ScrollProps, scrollEmits } from "./props";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { useMutationObserver } from "@/hooks/useMutationObserver";

// 最小滚动条大小
const MIN_THUMB_SIZE = 20;

defineOptions({
  name: "XScroll"
});

const props = withDefaults(defineProps<ScrollProps>(), {
  scrollX: true,
  scrollY: true,
  scrollbarType: "hover",
  size: 6,
  trackColor: "rgba(0, 0, 0, 0.05)",
  thumbColor: "rgba(0, 0, 0, 0.2)",
  thumbHoverColor: "rgba(0, 0, 0, 0.4)",
  contentClass: "",
  contentStyle: () => ({})
});

const emit = defineEmits(scrollEmits);

const scrollRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const verticalBarRef = ref<HTMLElement>();
const horizontalBarRef = ref<HTMLElement>();
const verticalThumbRef = ref<HTMLElement>();
const horizontalThumbRef = ref<HTMLElement>();

// 滚动状态
const isScrolling = ref(false);
let scrollingTimer: number;

// 拖拽状态
const isDragging = ref(false);
const dragDirection = ref<"vertical" | "horizontal">();
const dragStartPosition = ref(0);
const dragStartScroll = ref(0);

// 替换原来的computed属性为ref
const verticalThumbHeight = ref(MIN_THUMB_SIZE);
const verticalThumbTop = ref(0);
const horizontalThumbWidth = ref(MIN_THUMB_SIZE);
const horizontalThumbLeft = ref(0);

const showVerticalBar = ref(props.scrollY);
const showHorizontalBar = ref(props.scrollX);

// 更新展示垂直滚动条
const updateShowVerticalBar = () => {
  if (!contentRef.value) return;
  showVerticalBar.value =
    contentRef.value.scrollHeight > contentRef.value.clientHeight;
};

// 更新展示水平滚动条
const updateShowHorizontalBar = () => {
  if (!contentRef.value) return;
  showHorizontalBar.value =
    contentRef.value.scrollWidth > contentRef.value.clientWidth;
};

// 更新垂直滚动条尺寸
const updateVerticalThumbSize = () => {
  if (!showVerticalBar.value) return;
  if (!contentRef.value || !verticalBarRef.value) return;

  const { clientHeight, scrollHeight } = contentRef.value;
  const barHeight = verticalBarRef.value.clientHeight;
  verticalThumbHeight.value = Math.max(
    (clientHeight / scrollHeight) * barHeight,
    MIN_THUMB_SIZE
  );
};

// 更新水平滚动条尺寸
const updateHorizontalThumbSize = () => {
  if (!showHorizontalBar.value) return;
  if (!contentRef.value || !horizontalBarRef.value) return;

  const { clientWidth, scrollWidth } = contentRef.value;
  const barWidth = horizontalBarRef.value.clientWidth;
  horizontalThumbWidth.value = Math.max(
    (clientWidth / scrollWidth) * barWidth,
    MIN_THUMB_SIZE
  );
};

// 更新垂直滚动条位置
const updateVerticalThumbPosition = () => {
  if (!showVerticalBar.value) return;
  if (!contentRef.value || !verticalBarRef.value) return;

  const { scrollTop, scrollHeight, clientHeight } = contentRef.value;
  const barHeight = verticalBarRef.value.clientHeight;
  const maxTop = barHeight - verticalThumbHeight.value;
  const scrollRatio = scrollTop / (scrollHeight - clientHeight);
  verticalThumbTop.value = Math.min(maxTop, Math.max(0, scrollRatio * maxTop));
};

// 更新水平滚动条位置
const updateHorizontalThumbPosition = () => {
  if (!showHorizontalBar.value) return;
  if (!contentRef.value || !horizontalBarRef.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = contentRef.value;
  const barWidth = horizontalBarRef.value.clientWidth;
  const maxLeft = barWidth - horizontalThumbWidth.value;
  const horizontalRatio = scrollLeft / (scrollWidth - clientWidth);
  horizontalThumbLeft.value = Math.min(
    maxLeft,
    Math.max(0, horizontalRatio * maxLeft)
  );
};

// 更新滚动条
const updateScrollbar = () => {
  nextTick(() => {
    updateShowVerticalBar();
    updateShowHorizontalBar();

    nextTick(() => {
      updateVerticalThumbSize();
      updateHorizontalThumbSize();
      updateVerticalThumbPosition();
      updateHorizontalThumbPosition();
    });
  });
};

// 初始大小
onMounted(() => {
  updateScrollbar();
});

// 处理滚动事件
const handleScroll = (e: Event) => {
  emit("scroll", e);
  isScrolling.value = true;

  // 更新滚动条位置
  updateVerticalThumbPosition();
  updateHorizontalThumbPosition();

  // 清除之前的定时器
  if (scrollingTimer) {
    window.clearTimeout(scrollingTimer);
  }

  // 设置新的定时器
  scrollingTimer = window.setTimeout(() => {
    isScrolling.value = false;
    emit("scroll-end");
  }, 150);
};

// 处理轨道点击
const handleTrackClick = (
  direction: "vertical" | "horizontal",
  e: MouseEvent
) => {
  e.preventDefault();
  e.stopPropagation();

  if (!contentRef.value) return;

  const { clientX, clientY } = e;
  const target = e.target as HTMLElement;
  const rect = target.getBoundingClientRect();

  if (direction === "vertical") {
    const clickRatio = (clientY - rect.top) / rect.height;
    const scrollTarget = clickRatio * contentRef.value.scrollHeight;
    contentRef.value.scrollTo({
      top: scrollTarget - contentRef.value.clientHeight / 2,
      behavior: "smooth"
    });
  } else {
    const clickRatio = (clientX - rect.left) / rect.width;
    const scrollTarget = clickRatio * contentRef.value.scrollWidth;
    contentRef.value.scrollTo({
      left: scrollTarget - contentRef.value.clientWidth / 2,
      behavior: "smooth"
    });
  }
};

// 处理滑块拖拽
const handleThumbMouseDown = (
  direction: "vertical" | "horizontal",
  e: MouseEvent
) => {
  e.preventDefault();
  e.stopPropagation();

  isDragging.value = true;
  dragDirection.value = direction;

  if (direction === "vertical") {
    dragStartPosition.value = e.clientY;
    dragStartScroll.value = contentRef.value?.scrollTop || 0;
  } else {
    dragStartPosition.value = e.clientX;
    dragStartScroll.value = contentRef.value?.scrollLeft || 0;
  }

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);
};

const handleDragMove = (e: MouseEvent) => {
  if (!isDragging.value || !contentRef.value) return;

  requestAnimationFrame(() => {
    if (!contentRef.value) return;

    if (dragDirection.value === "vertical") {
      const { scrollHeight, clientHeight } = contentRef.value;
      const barHeight = verticalBarRef.value?.clientHeight || 0;
      const thumbHeight = verticalThumbHeight.value;
      const maxBarScroll = barHeight - thumbHeight;
      const maxContentScroll = scrollHeight - clientHeight;

      const delta = e.clientY - dragStartPosition.value;
      const ratio = delta / maxBarScroll;
      const newScroll = dragStartScroll.value + ratio * maxContentScroll;

      contentRef.value.scrollTop = Math.max(
        0,
        Math.min(maxContentScroll, newScroll)
      );
    } else {
      const { scrollWidth, clientWidth } = contentRef.value;
      const barWidth = horizontalBarRef.value?.clientWidth || 0;
      const thumbWidth = horizontalThumbWidth.value;
      const maxBarScroll = barWidth - thumbWidth;
      const maxContentScroll = scrollWidth - clientWidth;

      const delta = e.clientX - dragStartPosition.value;
      const ratio = delta / maxBarScroll;
      const newScroll = dragStartScroll.value + ratio * maxContentScroll;

      contentRef.value.scrollLeft = Math.max(
        0,
        Math.min(maxContentScroll, newScroll)
      );
    }
  });
};

const handleDragEnd = () => {
  isDragging.value = false;
  dragDirection.value = undefined;
  document.removeEventListener("mousemove", handleDragMove);
  document.removeEventListener("mouseup", handleDragEnd);
};

// 监听容器尺寸变化
useResizeObserver(scrollRef, () => {
  updateScrollbar();
});

// 监听内容变化
useMutationObserver(contentRef, () => {
  updateScrollbar();
});

onBeforeUnmount(() => {
  if (scrollingTimer) {
    window.clearTimeout(scrollingTimer);
  }
  document.removeEventListener("mousemove", handleDragMove);
  document.removeEventListener("mouseup", handleDragEnd);
});

const horizontalBarZIndex = ref(2000);
const verticalBarZIndex = ref(2000);
const handleBarMouseEnter = (direction: "vertical" | "horizontal") => {
  if (direction === "vertical") {
    verticalBarZIndex.value += 1;
  } else {
    horizontalBarZIndex.value += 1;
  }
};

defineExpose({
  updateScrollbar,
  contentRef
});
</script>
