<template>
  <x-tabs v-model="activeTab1" :items="basicItems">
    <div v-show="activeTab1 === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab1 === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab1 === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeTab1 = ref("1");
// 基础标签页
const basicItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
</script>
