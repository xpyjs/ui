<template>
  <XModal
    v-model:visible="dialogVisible"
    v-bind="omit($attrs, 'visible')"
    @show="emit('show')"
    @shown="emit('shown')"
    @hide="emit('hide')"
    @hidden="emit('hidden')"
  >
    <!-- 对话框主体 -->
    <div
      ref="dialogRef"
      :class="[
        'x-dialog',
        customClass,
        {
          'x-dialog--center': center,
          'x-dialog--fullscreen': fullscreen
        }
      ]"
      :style="{
        'z-index': 'var(--z-index)',
        width: wrapSize(props.width),
        ...dialogStyle
      }"
      role="dialog"
      aria-modal="true"
    >
      <!-- 头部 -->
      <div class="x-dialog__header">
        <slot name="title">
          <span class="x-dialog__title">{{ title }}</span>
        </slot>
        <XButton
          v-if="showClose"
          class="x-dialog__close"
          variant="text"
          @click="dialogVisible = false"
        >
          <XIcon name="line-md:close" />
        </XButton>
      </div>

      <!-- 内容区 -->
      <div
        class="x-dialog__body"
        :style="{ height: wrapSize(props.bodyHeight) }"
      >
        <XScroll content-style="padding: var(--x-dialog-padding);">
          <slot></slot>
        </XScroll>
      </div>

      <!-- 底部 -->
      <div v-if="showFooter && $slots.footer" class="x-dialog__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </XModal>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";
import { XIcon } from "@/components/icon";
import { XScroll } from "@/components/scroll";
import { XButton } from "@/components/button";
import XModal from "@/components/modal/src/modal.vue";
import { type DialogProps, dialogEmits } from "./props";
import { wrapSize } from "@/utils/size";
import { omit } from "@/utils/object";
import { getBoundingClientRect } from "@/utils/dom/rect";

defineOptions({
  name: "XDialog"
});

const props = withDefaults(defineProps<DialogProps>(), {
  visible: false,
  title: "标题",
  showClose: true,
  width: "50%",
  top: "15vh",
  showFooter: true
});
const emit = defineEmits(dialogEmits);
const dialogRef = ref<HTMLElement>();

const dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emit("update:visible", val);
    emit("close", val);
  }
});

const dialogWidth = ref(0);
const dialogHeight = ref(0);
// 对话框位置计算
watch(
  () => dialogRef.value,
  () => {
    const rect = getBoundingClientRect(dialogRef.value);
    dialogWidth.value = rect?.offsetWidth ?? 0;
    dialogHeight.value = rect?.offsetHeight ?? 0;
  },
  { immediate: true }
);

// 对话框样式计算
const dialogStyle = ref({});
watchEffect(() => {
  if (props.fullscreen) return;

  const left = `calc(50% - ${dialogWidth.value / 2}px)`;
  if (props.vertical === "top") {
    dialogStyle.value = {
      top: 0,
      left
    };
  } else if (props.vertical === "bottom") {
    dialogStyle.value = {
      bottom: 0,
      left
    };
  } else if (props.vertical === "center") {
    dialogStyle.value = {
      top: `calc(50% - ${dialogHeight.value / 2}px)`,
      left
    };
  } else {
    dialogStyle.value = {
      top: wrapSize(props.top),
      left
    };
  }
});
</script>
