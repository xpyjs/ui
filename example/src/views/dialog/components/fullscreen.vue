<template>
  <XButton @click="visible = true">全屏模式</XButton>
  <XDialog v-model:visible="visible" title="全屏对话框" fullscreen>
    <div class="dialog-content">
      <p>这是一个全屏显示的对话框</p>
      <p>内容区域会自动适应屏幕高度</p>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
</script>
