<template>
  <x-tabs
    v-model="activeTab"
    :items="dynamicItems"
    closable
    addable
    @close="handleDynamicClose"
    @add="handleAdd"
  >
    <div
      v-for="item in dynamicItems"
      :key="item.id"
      v-show="activeTab === item.id"
      class="tab-content"
    >
      {{ item.label }}的内容
    </div>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("1");

// 动态标签页
const dynamicItems = ref([
  { id: "1", label: "标签页1" },
  { id: "2", label: "标签页2" }
]);

// 关闭动态标签页
const handleDynamicClose = (id: string) => {
  const index = dynamicItems.value.findIndex(item => item.id === id);
  if (index > -1) {
    dynamicItems.value.splice(index, 1);
  }
};

// 新增标签页
const handleAdd = () => {
  const newId = String(dynamicItems.value.length + 1);
  dynamicItems.value.push({
    id: newId,
    label: `标签页${newId}`
  });
  activeTab.value = newId;
};
</script>

<style lang="scss" scoped>
.tab-content {
  padding: 20px;
  color: var(--x-text-color);
}
</style>
