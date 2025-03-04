<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-color-picker v-model="color1" />
    </Demo>

    <Demo title="大小">
      <div class="demo-row">
        <x-color-picker v-model="color1" size="small" />
        <x-color-picker v-model="color1" />
        <x-color-picker v-model="color1" size="large" />
      </div>
    </Demo>

    <Demo title="透明度选择">
      <div class="demo-row" style="align-items: center">
        <div class="demo-desc">可以选择透明度</div>
        <x-color-picker v-model="color2" show-alpha />
      </div>

      <div class="demo-row" style="align-items: center">
        <div class="demo-desc">颜色带透明度，但没有透明度选择</div>
        <x-color-picker v-model="color3" />
      </div>
    </Demo>

    <Demo title="内联模式">
      <div class="demo-row">
        <div>
          <div>当前选择颜色：{{ color4 }}</div>
          <x-color-picker v-model="color4" inline />
        </div>

        <div>
          <div>当前选择颜色：{{ color5 }}</div>
          <x-color-picker v-model="color5" inline show-alpha />
        </div>
      </div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const color1 = ref("#7654ee");
const color2 = ref("#7654ee77");
const color3 = ref("#F56C6C80");
const color4 = ref("#67C23A");
const color5 = ref("#E6A23C");
</script>

<style lang="scss" scoped>
.demo-row {
  width: 100%;
  display: flex;
  gap: 16px;
}

.demo-desc {
  color: var(--x-text-color-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}
</style>
