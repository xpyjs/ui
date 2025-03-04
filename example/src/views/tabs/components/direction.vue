<template>
  <x-tabs
    style="height: 200px"
    v-model="activeTab"
    :items="basicItems"
    direction="vertical"
  >
    <div v-show="activeTab === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>

  <x-tabs
    style="height: 200px"
    v-model="activeTab"
    :items="basicItems"
    direction="vertical"
    type="round"
  >
    <div v-show="activeTab === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>

  <x-tabs
    style="height: 200px"
    v-model="activeTab"
    :items="basicItems"
    direction="vertical"
    type="card"
  >
    <div v-show="activeTab === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("1");
const basicItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
</script>
