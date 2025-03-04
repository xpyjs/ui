<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-input-number v-model="value1" placeholder="请输入数字" />
      当前数字：{{ value1 }}
    </Demo>

    <Demo title="最大值和最小值">
      <div class="demo-row">
        <x-input-number
          v-model="value2"
          :min="0"
          :max="100"
          type="number"
          placeholder="0-100"
        />
      </div>
      当前数字：{{ value2 }}
    </Demo>

    <Demo title="精度控制">
      <div class="demo-row">
        <x-input-number
          v-model="value3"
          :precision="2"
          placeholder="保留2位小数"
        />
        当前数字：{{ value3 }}
      </div>

      <div class="demo-row">
        <x-input-number
          v-model="value4"
          :precision="0"
          placeholder="只能输入整数"
        />
        当前数字：{{ value4 }}
      </div>
    </Demo>

    <Demo title="尺寸">
      <div class="demo-row">
        <x-input-number v-model="value5" size="small" placeholder="小" />
        <x-input-number v-model="value5" placeholder="中" />
        <x-input-number v-model="value5" size="large" placeholder="大" />
      </div>
    </Demo>

    <Demo title="状态">
      <div class="demo-row">
        <x-input-number disabled v-model="value6" placeholder="禁用" />
        <x-input-number readonly v-model="value6" placeholder="只读" />
        <x-input-number v-model="value6" status="success" placeholder="成功" />
        <x-input-number v-model="value6" status="warning" placeholder="警告" />
        <x-input-number v-model="value6" status="error" placeholder="错误" />
      </div>
    </Demo>

    <Demo title="可清空">
      <x-input-number
        v-model="value7"
        clearable
        placeholder="点击清除图标清空"
      />
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const value1 = ref<number | null>(null);
const value2 = ref<number | null>(50);
const value3 = ref<number | null>(3.14);
const value4 = ref<number | null>(100);
const value5 = ref<number | null>(null);
const value6 = ref<number | null>(666);
const value7 = ref<number | null>(null);
</script>

<style lang="scss" scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
