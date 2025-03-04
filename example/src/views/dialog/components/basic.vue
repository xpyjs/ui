<template>
  <XButton @click="visible = true">打开对话框</XButton>
  <XDialog v-model:visible="visible" title="基础对话框">
    <div class="dialog-content">
      <p>这是一个基础对话框示例</p>
      <p>支持通过插槽自定义内容</p>
    </div>
    <template #footer>
      <XButton @click="visible = false">取消</XButton>
      <XButton type="primary" @click="visible = false">确定</XButton>
    </template>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
</script>
