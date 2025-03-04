<template>
  <x-tabs v-model="activeTab" type="line" :items="basicItems">
    <div v-show="activeTab === '1'">线条指示器一的内容</div>
    <div v-show="activeTab === '2'">线条指示器二的内容</div>
    <div v-show="activeTab === '3'">线条指示器三的内容</div>
  </x-tabs>

  <x-tabs v-model="activeTab" type="round" :items="basicItems">
    <div v-show="activeTab === '1'">圆角指示器一的内容</div>
    <div v-show="activeTab === '2'">圆角指示器二的内容</div>
    <div v-show="activeTab === '3'">圆角指示器三的内容</div>
  </x-tabs>

  <x-tabs v-model="activeTab" type="card" :items="basicItems">
    <div v-show="activeTab === '1'">卡片指示器一的内容</div>
    <div v-show="activeTab === '2'">卡片指示器二的内容</div>
    <div v-show="activeTab === '3'">卡片指示器三的内容</div>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("1");

// 基础标签页
const basicItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
</script>
