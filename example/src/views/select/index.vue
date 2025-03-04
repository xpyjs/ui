<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-select
        v-model="value1"
        :items="items"
        placeholder="请选择"
        style="width: 200px"
        :popup-props="{ appendTo: null }"
      />
      <div class="demo-value">当前值: {{ value1 }}</div>
    </Demo>

    <Demo title="多选模式">
      <x-select
        v-model="value2"
        :items="items"
        multiple
        placeholder="请选择多个选项"
        style="width: 200px"
        clearable
      />
      <x-select
        v-model="value2"
        :items="items"
        multiple
        type="tag"
        placeholder="请选择多个选项"
        style="width: 200px; margin-left: 16px"
        clearable
      />
      <div class="demo-value">当前值: {{ value2 }}</div>
    </Demo>

    <Demo title="自定义选项">
      <x-select
        v-model="value3"
        :items="customItems"
        :options="{ label: 'text', value: 'id' }"
        placeholder="自定义键名"
        style="width: 200px"
        clearable
      />
      <div class="demo-value">当前值: {{ value3 }}</div>
    </Demo>

    <Demo title="禁用选项">
      <x-select
        v-model="value4"
        :items="disabledItems"
        placeholder="包含禁用选项"
        style="width: 200px"
        clearable
      />
      <x-select
        v-model="value4"
        :items="items"
        disabled
        placeholder="整体禁用"
        style="width: 200px; margin-left: 16px"
      />
      <div class="demo-value">当前值: {{ value4 }}</div>
    </Demo>

    <Demo title="不同尺寸">
      <x-select
        v-model="value5"
        :items="items"
        size="small"
        placeholder="小号"
        style="width: 200px"
        clearable
      />
      <x-select
        v-model="value5"
        :items="items"
        placeholder="默认"
        style="width: 200px; margin: 0 16px"
        clearable
      />
      <x-select
        v-model="value5"
        :items="items"
        size="large"
        placeholder="大号"
        style="width: 200px"
        clearable
      />
      <div class="demo-value">当前值: {{ value5 }}</div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const value1 = ref("");
const value2 = ref([]);
const value3 = ref("");
const value4 = ref("");
const value5 = ref("");

// 基础选项
const items = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" }
];

// 禁用选项
const disabledItems = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3", disabled: true },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" }
];

// 自定义键名选项
const customItems = [
  { text: "自定义1", id: "1" },
  { text: "自定义2", id: "2" },
  { text: "自定义3", id: "3" },
  { text: "自定义4", id: "4" }
];
</script>

<style lang="scss" scoped>
.demo-container {
  :deep(.x-select) {
    margin-bottom: 8px;
  }

  .demo-value {
    margin-top: 8px;
    color: #666;
    font-size: 14px;
  }
}
</style>
