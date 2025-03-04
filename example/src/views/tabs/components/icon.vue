<template>
  <x-tabs v-model="activeTab" :items="iconItems">
    <div v-show="activeTab === '1'" class="tab-content">首页内容</div>
    <div v-show="activeTab === '2'" class="tab-content">用户内容</div>
    <div v-show="activeTab === '3'" class="tab-content">设置内容</div>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("1");
// 带图标标签页
const iconItems = ref([
  { id: "1", label: "首页", icon: "mdi:home" },
  { id: "2", label: "用户", icon: "mdi:account" },
  { id: "3", label: "设置", icon: "mdi:cog" }
]);
</script>
