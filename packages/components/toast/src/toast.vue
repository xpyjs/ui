<template>
  <teleport to="body" :disabled="!visible">
    <transition :name="currentTransitionName" @after-leave="emit('close')">
      <div
        v-if="visible"
        ref="toastRef"
        :class="[
          'x-toast',
          `x-toast--${type}`,
          {
            'x-toast--inverse': inverse
          }
        ]"
        :style="{
          ...toastStyle,
          'z-index': zIndexToast
        }"
        role="alert"
      >
        <!-- 图标 -->
        <x-icon
          v-if="currentIcon"
          size="16"
          :name="currentIcon"
          class="x-toast__icon"
        />
        <!-- 内容 -->
        <span class="x-toast__content">{{ content }}</span>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { XIcon } from "@/components/icon";
import { type ToastProps, toastEmits } from "./props";
import { useZIndex } from "@/hooks/useZIndex";
import { wrapSize } from "@/utils/size";
import { useTransition } from "@/hooks/useTransition";

defineOptions({
  name: "XToast"
});

const props = withDefaults(defineProps<ToastProps>(), {
  visible: false,
  content: "",
  type: "default" as any,
  top: "top",
  icon: "",
  inverse: true,
  duration: 3000,
  transitionName: "x-fade"
});
const emit = defineEmits(toastEmits);

// 计算图标
const currentIcon = computed(() => {
  if (props.icon) return props.icon;

  // 默认图标映射
  const iconMap = {
    info: "material-symbols:info-outline",
    success: "material-symbols:check-circle-outline",
    warning: "material-symbols:warning-outline",
    error: "material-symbols:error-outline"
  } as const;

  return props.type === "default"
    ? ""
    : iconMap[props.type as keyof typeof iconMap];
});

// z-index 管理
const { zIndex, generateZIndex } = useZIndex();
const zIndexToast = ref(zIndex.value);

// 引用动画名称
const { transitionName: currentTransitionName } = useTransition(
  computed(() => props.transitionName)
);

// 自动关闭
let timer: number;
watch(
  () => props.visible,
  val => {
    if (val && props.duration > 0) {
      zIndexToast.value++;
      generateZIndex();

      timer && clearTimeout(timer);
      timer = window.setTimeout(() => {
        emit("update:visible", false);
      }, props.duration);
    } else if (!val && timer) {
      clearTimeout(timer);
    }
  },
  { immediate: true }
);

// 获取 toast 元素
const toastRef = ref<HTMLElement>();

// 计算 toast 元素宽度，并计算水平居中
const toastStyle = computed(() => {
  const style: Record<string, string> = {};
  const width = toastRef.value?.offsetWidth;
  const height = toastRef.value?.offsetHeight;
  if (width) {
    style.left = `calc(50% - ${width / 2}px)`;
  }

  switch (props.top) {
    case "center":
      style.top = `calc(50% - ${(height ?? 0) / 2}px)`;
      break;
    case "bottom":
      style.bottom = "15vh";
      break;
    case "top":
      style.top = "15vh";
      break;
    default:
      style.top = wrapSize(props.top, "15vh");
  }

  return style;
});
</script>
