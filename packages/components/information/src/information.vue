<template>
  <teleport to="body" :disabled="!visible">
    <transition :name="currentTransitionName" @after-leave="emit('close')">
      <div
        v-if="visible"
        ref="informationRef"
        :class="[
          'x-information',
          `x-information--${type}`,
          `x-information--${position}`
        ]"
        :style="{
          zIndex: zIndexInformation,
          ...informationStyle
        }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- 标题区域 -->
        <div class="x-information__header">
          <slot name="title">
            <div class="x-information__title">
              <!-- 图标 -->
              <x-icon
                v-if="currentIcon"
                size="20"
                :name="currentIcon"
                class="x-information__icon"
              />
              <span>{{ title }}</span>
            </div>
          </slot>
          <x-button
            v-if="closable"
            class="x-information__close"
            variant="text"
            @click="handleClose"
          >
            <x-icon name="line-md:close" />
          </x-button>
        </div>

        <!-- 内容区域 -->
        <div class="x-information__body">
          <slot>
            <span class="x-information__content">{{ content }}</span>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { XIcon } from "@/components/icon";
import { XButton } from "@/components/button";
import { type InformationProps, informationEmits } from "./props";
import { getMessageInstance } from "../../message/src/manager";
import { useTransition } from "@/hooks/useTransition";
import { useZIndex } from "@/hooks/useZIndex";

defineOptions({
  name: "XInformation"
});

const props = withDefaults(defineProps<InformationProps>(), {
  position: "top-right",
  duration: 3000,
  closable: true,
  enterable: true
});

const emit = defineEmits(informationEmits);

// 计算图标
const currentIcon = computed(() => {
  // 默认图标映射
  const iconMap = {
    info: "material-symbols:info",
    success: "material-symbols:check-circle",
    warning: "material-symbols:warning",
    error: "material-symbols:error"
  } as const;

  return props.type === "default"
    ? ""
    : iconMap[props.type as keyof typeof iconMap];
});

// 获取管理器实例
const manager = getMessageInstance("x-information-component");

// 获取元素引用
const informationRef = ref<HTMLElement>();

// 监听元素引用变化
watch(
  () => informationRef.value,
  () => {
    if (informationRef.value) {
      manager.add(informationRef.value, props.position);
    } else {
      manager.remove(informationRef.value);
    }
  }
);

// z-index 管理
const { zIndex, generateZIndex } = useZIndex();
const zIndexInformation = ref(zIndex.value);

// 根据位置计算动画名称
const defaultTransitionName = computed(() => {
  switch (props.position) {
    case "top-left":
    case "bottom-left":
      return "x-slide-right";
    case "top-right":
    case "bottom-right":
      return "x-slide-left";
    default:
      return "x-slide-left";
  }
});

// 使用动画
const { transitionName: currentTransitionName } = useTransition(
  computed(() => props.transitionName ?? defaultTransitionName.value)
);

// 自动关闭相关逻辑
let timer: number;
const startTimer = () => {
  if (props.duration > 0) {
    timer = window.setTimeout(() => {
      emit("update:visible", false);
    }, props.duration);
  }
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = 0;
  }
};

watch(
  () => props.visible,
  val => {
    if (val) {
      zIndexInformation.value++;
      generateZIndex();
      startTimer();
    } else {
      clearTimer();
      if (informationRef.value) {
        manager.remove(informationRef.value);
      }
    }
  },
  { immediate: true }
);

// 鼠标移入移出处理
const handleMouseEnter = () => {
  if (props.enterable) {
    clearTimer();
  }
};

const handleMouseLeave = () => {
  if (props.enterable) {
    startTimer();
  }
};

// 关闭按钮点击
const handleClose = () => {
  clearTimer();
  emit("update:visible", false);
};

// 计算位置偏移
const distance = ref(0);

// 计算样式
const informationStyle = computed(() => {
  const style: Record<string, string> = {};

  // 根据位置设置样式
  switch (props.position) {
    case "top-left":
      style.top = `calc(20px + ${distance.value}px)`;
      style.left = "20px";
      break;
    case "top-right":
      style.top = `calc(20px + ${distance.value}px)`;
      style.right = "20px";
      break;
    case "bottom-left":
      style.bottom = `calc(20px + ${distance.value}px)`;
      style.left = "20px";
      break;
    case "bottom-right":
      style.bottom = `calc(20px + ${distance.value}px)`;
      style.right = "20px";
      break;
  }

  return style;
});

// 订阅消息列表变化
manager.onChange(() => {
  if (informationRef.value) {
    distance.value = manager.getDistance(informationRef.value);
  }
});

// 组件销毁时清理
onUnmounted(() => {
  clearTimer();
});
</script>
