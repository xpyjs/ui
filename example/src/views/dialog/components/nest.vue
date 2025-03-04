<template>
  <XButton @click="visibleParent = true">子对话框</XButton>
  <XDialog
    v-model:visible="visibleParent"
    title="子对话框示例"
    :show-footer="false"
  >
    <div class="dialog-content">
      <p>这个是父对话框</p>
      <XButton @click="visibleChild = true">打开子对话框</XButton>
      <XDialog
        v-model:visible="visibleChild"
        title="子对话框"
        top="20vh"
        width="200px"
      >
        <p>这个是子对话框</p>
      </XDialog>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visibleParent = ref(false);
const visibleChild = ref(false);
</script>
