<template>
  <teleport to="body" :disabled="!visible">
    <transition :name="currentTransitionName" @after-leave="emit('close')">
      <div
        v-if="visible"
        ref="messageRef"
        :class="[
          'x-message',
          `x-message--${type}`,
          {
            'x-message--closable': closable
          }
        ]"
        :style="{
          'z-index': zIndexMessage,
          ...messageStyle
        }"
        role="alert"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- 图标 -->
        <x-icon
          v-if="currentIcon"
          size="20"
          :name="currentIcon"
          class="x-message__icon"
        />
        <!-- 内容 -->
        <span class="x-message__content">{{ content }}</span>
        <!-- 关闭按钮 -->
        <x-button
          v-if="closable"
          class="x-message__close"
          variant="text"
          @click="handleClose"
        >
          <x-icon name="line-md:close" />
        </x-button>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { XIcon } from "@/components/icon";
import { XButton } from "@/components/button";
import { messageEmits, type MessageProps } from "./props";
import { useZIndex } from "@/hooks/useZIndex";
import { useTransition } from "@/hooks/useTransition";
import { wrapSize } from "@/utils/size";
import { getMessageInstance } from "./manager";

defineOptions({
  name: "XMessage"
});

const props = withDefaults(defineProps<MessageProps>(), {
  visible: false,
  type: "info" as any,
  top: "center",
  duration: 3000,
  closable: true,
  enterable: true,
  transitionName: "x-slide-down"
});

const emit = defineEmits(messageEmits);

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

// z-index 管理
const { zIndex, generateZIndex } = useZIndex();
const zIndexMessage = ref(zIndex.value);

// 引用动画名称
const { transitionName: currentTransitionName } = useTransition(
  computed(() => props.transitionName)
);

// 自动关闭
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

// 处理鼠标移入
const handleMouseEnter = () => {
  if (props.enterable) {
    clearTimer();
  }
};

// 处理鼠标移出
const handleMouseLeave = () => {
  if (props.enterable) {
    startTimer();
  }
};

// 手动关闭
const handleClose = () => {
  clearTimer();
  emit("update:visible", false);
};

// 获取管理器实例
const manager = getMessageInstance("x-message-component");

// 获取 message 元素
const messageRef = ref<HTMLElement>();

// 监听元素引用变化
watch(
  () => messageRef.value,
  () => {
    if (messageRef.value) {
      manager.add(messageRef.value, props.top);
    } else {
      manager.remove(messageRef.value);
    }
  },
  { immediate: true }
);

// 监听可见性变化
watch(
  () => props.visible,
  val => {
    if (val) {
      zIndexMessage.value++;
      generateZIndex();
      startTimer();
    } else {
      clearTimer();
      if (messageRef.value) {
        manager.remove(messageRef.value);
      }
    }
  },
  { immediate: true }
);

// 组件卸载时移除实例
onUnmounted(() => {
  clearTimer();
  if (messageRef.value) {
    manager.remove(messageRef.value);
  }
});

const distance = ref(0);

// 计算 message 元素宽度，并计算水平居中
const messageStyle = computed(() => {
  const style: Record<string, string> = {};
  const width = messageRef.value?.offsetWidth;
  const height = messageRef.value?.offsetHeight;
  if (width) {
    style.left = `calc(50% - ${width / 2}px)`;
  }

  switch (props.top) {
    case "center":
      style.top = `calc(50% - ${(height ?? 0) / 2}px + ${distance.value}px)`;
      break;
    case "bottom":
      style.bottom = `calc(5vh + ${distance.value}px)`;
      break;
    case "top":
      style.top = `calc(5vh + ${distance.value}px)`;
      break;
    default:
      style.top = `calc(${wrapSize(props.top, "5vh")} + ${distance.value}px)`;
  }

  return style;
});

// 订阅消息列表变化,强制更新样式
manager.onChange(() => {
  distance.value = manager.getDistance(messageRef.value);
});
</script>
