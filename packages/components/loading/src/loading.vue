<template>
  <Transition name="x-fade" v-on:after-leave="$emit('after-leave')">
    <div v-if="show" :class="['x-loading']">
      <div v-if="mask" class="x-loading__mask" @wheel="handleWheel"></div>
      <div class="x-loading__spinner">
        <slot name="icon" v-if="$slots.icon || icon">
          <template v-if="icon">
            <template v-if="typeof icon === 'string'">
              <XIcon :name="icon" :style="iconStyle" />
            </template>
            <component v-else :is="icon" :style="iconStyle" />
          </template>
        </slot>
        <template v-else>
          <component
            :is="animations[type]"
            :size="24"
            :color="'currentColor'"
          />
        </template>
        <div v-if="text" class="x-loading__text">{{ text }}</div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { XIcon } from "@/components/icon";
import { type LoadingProps } from "./props";
import { animations } from "./animations";

defineOptions({
  name: "XLoading"
});

const props = withDefaults(defineProps<LoadingProps>(), {
  visible: false,
  type: "spinner",
  mask: true,
  fullscreen: false
});

const emit = defineEmits(["after-leave"]);

const show = ref(false);
defineExpose({
  show
});

watch(
  () => props.visible,
  val => {
    show.value = val;
  },
  { immediate: true }
);

const handleWheel = (e: Event) => {
  // 全屏滚动时，禁止滚动
  if (props.fullscreen) {
    e.preventDefault();
  }
};
</script>
