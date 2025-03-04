<template>
  <Teleport :to="target" :disabled="!visible">
    <Transition name="x-fade">
      <div
        v-show="visible"
        ref="fixedRef"
        :class="[
          'x-fixed',
          {
            'x-fixed--dragging': isDragging
          }
        ]"
        :style="fixedStyle"
        @mousedown.prevent.stop="handleDragStart"
      >
        <!-- 内容插槽 -->
        <div class="x-fixed__content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeUnmount } from "vue";
import { unrefElement } from "@/utils/dom/unrefElement";
import { getBoundingClientRect } from "@/utils/dom/rect";
import { type FixedProps, fixedEmits } from "./props";

defineOptions({
  name: "XFixed"
});

const props = withDefaults(defineProps<FixedProps>(), {
  target: "body",
  position: () => ({
    right: "40px",
    bottom: "40px"
  }),
  zIndex: 6000
});
const emit = defineEmits(fixedEmits);

const fixedRef = ref<HTMLElement>();
const isDragging = ref(false);

const pos = ref<{ top?: number; left?: number }>({
  top: undefined,
  left: undefined
});

// 计算容器样式
const fixedStyle = computed(() => {
  const style: Record<string, string | number> = {
    position: props.target === "body" ? "fixed" : "absolute",
    zIndex: props.zIndex
  };

  if (pos.value.top !== undefined) {
    style.top = `${pos.value.top}px`;
  } else if (props.position.top) {
    style.top = props.position.top;
  } else if (props.position.bottom) {
    style.bottom = props.position.bottom;
  }

  if (pos.value.left !== undefined) {
    style.left = `${pos.value.left}px`;
  } else if (props.position.left) {
    style.left = props.position.left;
  } else if (props.position.right) {
    style.right = props.position.right;
  }

  return style;
});

// 处理拖拽开始
const handleDragStart = (e: MouseEvent) => {
  if (!props.draggable) return;

  isDragging.value = true;
  const fixedRect = getBoundingClientRect(fixedRef.value);
  const targetEl = unrefElement(props.target);
  const targetRect = getBoundingClientRect(targetEl);
  if (!fixedRect || !targetRect) return;

  // 如果还没有初始位置，则计算初始位置
  if (pos.value.top === undefined || pos.value.left === undefined) {
    let _top = fixedRect.top;
    let _left = fixedRect.left;

    if (props.target !== "body") {
      _top -= targetRect.top;
      _left -= targetRect.left;
    }

    pos.value = {
      top: _top,
      left: _left
    };
  }

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);
};

// 处理拖拽移动
const handleDragMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  emit("dragging", true);

  const targetEl = unrefElement(props.target);
  const targetRect = getBoundingClientRect(targetEl);
  const fixedRect = getBoundingClientRect(fixedRef.value);
  if (!fixedRect || !targetRect) return;

  // 使用 movementX/Y 来更新位置
  let _top = pos.value.top! + e.movementY;
  let _left = pos.value.left! + e.movementX;

  // 添加边界检查
  _top = Math.max(0, Math.min(_top, targetRect.height - fixedRect.height));
  _left = Math.max(0, Math.min(_left, targetRect.width - fixedRect.width));

  pos.value = {
    top: _top,
    left: _left
  };

  emit("change", {
    top: _top,
    left: _left
  });
};

// 处理拖拽结束
const handleDragEnd = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleDragMove);
  document.removeEventListener("mouseup", handleDragEnd);

  setTimeout(() => {
    emit("dragging", false);
  }, 0);
};

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", handleDragMove);
  document.removeEventListener("mouseup", handleDragEnd);
});
</script>
