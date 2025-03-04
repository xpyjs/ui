<template>
  <x-tabs v-model="activeTab" :items="closeItems" closable @close="handleClose">
    <div v-show="activeTab === '1'" class="tab-content">标签页一内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三内容</div>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeTab = ref("1");

// 可关闭标签页
const closeItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
// 关闭标签页
const handleClose = (id: string) => {
  const index = closeItems.value.findIndex(item => item.id === id);
  if (index > -1) {
    closeItems.value.splice(index, 1);
  }
};
</script>
