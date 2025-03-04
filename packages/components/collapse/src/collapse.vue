<template>
  <div
    :class="[
      'x-collapse',
      `x-collapse--${currentDirection}`,
      {
        'x-collapse--expanded': expanded,
        'x-collapse--disabled': disabled
      }
    ]"
  >
    <!-- 触发器 -->
    <div class="x-collapse__trigger" @click="handleTriggerClick">
      <slot name="trigger" :expanded="expanded">
        <div class="x-collapse__trigger-default">
          <span class="x-collapse__trigger-label">{{ label }}</span>
          <XIcon class="x-collapse__arrow" name="fe:arrow-up" />
        </div>
      </slot>
    </div>

    <!-- 内容区域 -->
    <div
      ref="contentRef"
      :style="contentStyle"
      @transitionend="handleTransitionEnd"
    >
      <XScroll
        ref="wrapperRef"
        class="x-collapse__wrapper"
        content-class="x-collapse__content"
      >
        <slot></slot>
      </XScroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, watchEffect, inject } from "vue";
import { type CollapseProps, collapseEmits } from "./props";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { wrapSize } from "@/utils/size";
import XIcon from "@/components/icon";
import XScroll, { type XScrollInstance } from "@/components/scroll";
import type { CollapseGroupContext } from "./collapse-group";

defineOptions({
  name: "XCollapse"
});

const props = withDefaults(defineProps<CollapseProps>(), {
  visible: false,
  label: "",
  direction: "vertical",
  disabled: false,
  name: ""
});
const emit = defineEmits(collapseEmits);
const contentRef = ref<HTMLDivElement>();
const wrapperRef = ref<XScrollInstance>();
const contentWidth = ref(0);
const contentHeight = ref(0); // 用于横向模式固定高度

const expanded = ref(false);
watchEffect(() => {
  expanded.value = props.visible;
});

const currentDirection = ref("vertical");
watchEffect(() => {
  currentDirection.value = props.direction;
});

// 注入分组上下文
const groupContext = inject<CollapseGroupContext | undefined>(
  "collapseGroupContext",
  undefined
);
watchEffect(() => {
  if (groupContext) {
    // 判断分组
    if (props.name) {
      if (groupContext.accordion.value) {
        expanded.value = groupContext.active.value === props.name;
      } else {
        expanded.value = groupContext.activeList.value?.includes(props.name);
      }
    }

    // 监听方向
    currentDirection.value = groupContext.direction.value;
  }
});

// 处理触发器点击
const handleTriggerClick = () => {
  if (props.disabled) return;
  expanded.value = !expanded.value;

  if (groupContext && props.name) {
    groupContext.handleItemClick(props.name);
  } else {
    emit("update:visible", expanded.value);
    emit("change", expanded.value);
  }
};

// 处理过渡结束
const handleTransitionEnd = () => {
  if (!wrapperRef.value) return;
  wrapperRef.value.updateScrollbar();
};

// 计算内容样式
const contentStyle = ref({});
const computedContentStyle = () => {
  const size = props.size;
  const style: Record<string, string> = {
    transition: "all 0.3s ease",
    overflow: "hidden"
  };

  if (currentDirection.value === "vertical") {
    style.height = expanded.value ? wrapSize(size || contentHeight.value) : "0";
  } else {
    style.width = expanded.value ? wrapSize(size || contentWidth.value) : "0";
    style.height = `${contentHeight.value}px`;
  }

  contentStyle.value = style;

  // 更新滚动条
  wrapperRef.value?.updateScrollbar();
};

watch(
  [() => expanded.value, () => props.size, () => currentDirection.value],
  computedContentStyle
);

// 监听内容变化
useResizeObserver(wrapperRef.value?.contentRef, () => {
  contentWidth.value = contentRef.value?.offsetWidth || 0;
  contentHeight.value = contentRef.value?.offsetHeight || 0;

  computedContentStyle();
});

// 初始化尺寸
onMounted(() => {
  contentWidth.value = contentRef.value?.offsetWidth || 0;
  contentHeight.value = contentRef.value?.offsetHeight || 0;

  computedContentStyle();
});
</script>
