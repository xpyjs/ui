<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-slider v-model="value1" />
    </Demo>

    <Demo title="显示数值">
      <x-slider v-model="value2" show-value />
    </Demo>

    <Demo title="步进按钮">
      <x-slider v-model="value3" show-buttons />
    </Demo>

    <Demo title="刻度标记">
      <x-slider v-model="value4" show-ticks :step="10" />
    </Demo>

    <Demo title="不同尺寸">
      <div class="demo-row">
        <x-slider v-model="value5" size="small" show-value />
        <x-slider v-model="value5" size="medium" show-value />
        <x-slider v-model="value5" size="large" show-value />
      </div>
    </Demo>

    <Demo title="不同类型">
      <div class="demo-row">
        <x-slider v-model="value6" type="primary" show-value />
        <x-slider v-model="value6" type="success" show-value />
        <x-slider v-model="value6" type="warning" show-value />
        <x-slider v-model="value6" type="error" show-value />
      </div>
    </Demo>

    <Demo title="垂直方向">
      <div style="height: 200px; display: flex; gap: 32px">
        <x-slider v-model="value7" vertical />
        <x-slider v-model="value7" vertical show-value />
        <x-slider v-model="value7" vertical show-buttons />
        <x-slider v-model="value7" vertical show-ticks :step="10" />
      </div>
    </Demo>

    <Demo title="自定义范围">
      <x-slider v-model="value8" :min="-20" :max="20" show-value />
    </Demo>

    <Demo title="自定义步长">
      <x-slider v-model="value9" :step="5" show-value show-ticks />
    </Demo>

    <Demo title="禁用状态">
      <x-slider v-model="value10" disabled show-value />
    </Demo>

    <Demo title="自定义按钮">
      <x-slider v-model="value11" show-value>
        <template #button>
          <div class="custom-button">
            <x-icon name="mdi:drag" />
          </div>
        </template>
      </x-slider>
    </Demo>

    <Demo title="自定义步进按钮">
      <x-slider v-model="value12" show-buttons show-value>
        <template #decrease>
          <x-icon name="mdi:minus-circle" />
        </template>
        <template #increase>
          <x-icon name="mdi:plus-circle" />
        </template>
      </x-slider>
    </Demo>

    <Demo title="区间选择">
      <x-slider v-model="rangeValue" :step="10" show-value show-ticks />
      <div>当前值: {{ rangeValue }}</div>
    </Demo>

    <Demo title="自动排序">
      <x-slider v-model="rangeValue2" show-value />
      <div>当前值: {{ rangeValue2 }}</div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const value1 = ref(0);
const value2 = ref(30);
const value3 = ref(40);
const value4 = ref(50);
const value5 = ref(60);
const value6 = ref(70);
const value7 = ref(80);
const value8 = ref(0);
const value9 = ref(50);
const value10 = ref(50);
const value11 = ref(50);
const value12 = ref(50);
const rangeValue = ref([20, 60]);
const rangeValue2 = ref([60, 30]);
</script>

<style lang="scss" scoped>
.demo-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.custom-button {
  width: 24px;
  height: 24px;
  background-color: var(--x-color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--x-bg-color);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  .x-icon {
    font-size: 16px;
  }
}
</style>
