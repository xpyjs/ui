<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <Basic />
    </Demo>

    <Demo title="全屏 Loading">
      <Fullscreen />
    </Demo>

    <Demo title="不同类型">
      <Types />
    </Demo>

    <Demo title="自定义文本">
      <CustomText />
    </Demo>

    <Demo title="自定义图标">
      <CustomIcon />
    </Demo>

    <Demo title="使用钩子方法">
      <Hook />
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Basic from "./components/basic.vue";
import Fullscreen from "./components/fullscreen.vue";
import Types from "./components/types.vue";
import CustomText from "./components/custom-text.vue";
import CustomIcon from "./components/custom-icon.vue";
import Hook from "./components/hook.vue";
</script>

<style lang="scss">
.loading-types {
  width: 100%;
  display: flex;
  gap: 1rem;
}

.loading-type {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-name {
  text-align: center;
  text-transform: capitalize;
}

.loading-container {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--x-bg-color-hover);
  border-radius: var(--x-border-radius-base);
  color: var(--x-text-color-secondary);
}

.loading-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--x-bg-color-hover);
  border-radius: var(--x-border-radius-base);
  color: var(--x-text-color-secondary);
}

.mt-4 {
  margin-top: 1rem;
}
</style>
