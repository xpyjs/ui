<template>
  <XButton @click="visible = true">自定义宽度</XButton>
  <XDialog v-model:visible="visible" title="宽对话框" width="800px">
    <div class="dialog-content">
      <p>这个对话框的宽度设置为800px</p>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
</script>
