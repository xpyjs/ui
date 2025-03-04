<template>
  <div>
    <div>容器内，滚动超过100px时，显示回到顶部按钮</div>

    <div class="demo-scroll-container" ref="containerRef">
      <div class="demo-scroll-content" ref="scrollRef" @scroll="handleScroll">
        <p v-for="i in 50" :key="i">这是第 {{ i }} 行内容</p>
      </div>

      <x-fixed
        :target="containerRef"
        :visible="showBackTop"
        :position="{ right: '20px', bottom: '20px' }"
        :draggable="true"
        @dragging="handleDragging"
      >
        <x-button type="primary" shape="circle" @click="handleBackTop">
          <template #icon>
            <x-icon name="mdi:arrow-up" />
          </template>
        </x-button>
      </x-fixed>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const containerRef = ref<HTMLElement>();
const scrollRef = ref<HTMLElement>();
const showBackTop = ref(false);

const handleScroll = () => {
  if (!scrollRef.value) return;
  showBackTop.value = scrollRef.value.scrollTop > 100;
};

const isDragging = ref(false);
const handleDragging = (val: boolean) => {
  isDragging.value = val;
};

const handleBackTop = () => {
  if (isDragging.value) return;
  scrollRef.value?.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
</script>

<style scoped>
.demo-scroll-container {
  height: 300px;
  width: 600px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--x-border-color);
  border-radius: var(--x-border-radius-base);
  margin-top: 12px;

  .demo-scroll-content {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
