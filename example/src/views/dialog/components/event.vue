<template>
  <XButton @click="visible = true">事件监控</XButton>
  <XDialog
    v-model:visible="visible"
    title="事件示例"
    @show="logEvent('show')"
    @shown="logEvent('shown')"
    @hide="logEvent('hide')"
    @hidden="logEvent('hidden')"
  >
    <div class="event-content">
      <p>打开控制台查看事件触发情况</p>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
const visible = ref(false);

const logEvent = (name: string) => {
  console.log(`Dialog事件触发: ${name}`);
};
</script>
