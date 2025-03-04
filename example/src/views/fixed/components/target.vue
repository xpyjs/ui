<template>
  <div ref="containerRef" class="demo-container-box">
    <p>这是一个容器,浮动按钮只能在这个容器内移动</p>
    <x-fixed
      :target="containerRef"
      :draggable="true"
      :position="{ right: '20px', bottom: '20px' }"
    >
      <x-icon name="mdi:plus" />
    </x-fixed>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const containerRef = ref<HTMLElement>();
</script>

<style scoped>
.demo-container-box {
  position: relative;
  height: 200px;
  padding: 20px;
  border: 1px solid var(--x-border-color);
  border-radius: var(--x-border-radius-base);
  background: var(--x-bg-color);
}
</style>
