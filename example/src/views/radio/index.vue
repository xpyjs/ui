<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-radio v-model="radio1" value="1">选项1</x-radio>
      <x-radio v-model="radio1" value="2">选项2</x-radio>
    </Demo>

    <Demo title="不同尺寸">
      <div class="demo-row">
        <x-radio v-model="radio2" value="1" size="small">小型</x-radio>
        <x-radio v-model="radio2" value="2" size="medium">中等</x-radio>
        <x-radio v-model="radio2" value="3" size="large">大型</x-radio>
      </div>
    </Demo>

    <Demo title="不同类型">
      <div class="demo-row">
        <x-radio v-model="radio3" value="1" type="default">默认</x-radio>
        <x-radio v-model="radio3" value="2" type="primary">主要</x-radio>
        <x-radio v-model="radio3" value="3" type="success">成功</x-radio>
        <x-radio v-model="radio3" value="4" type="warning">警告</x-radio>
        <x-radio v-model="radio3" value="5" type="error">错误</x-radio>
      </div>
    </Demo>

    <Demo title="禁用状态">
      <div class="demo-row">
        <x-radio v-model="radio4" value="1" disabled>禁用未选中</x-radio>
        <x-radio v-model="radio4" value="2" disabled>禁用已选中</x-radio>
      </div>
    </Demo>

    <Demo title="分组使用">
      <div class="demo-desc">绑定相同 v-model 值，自动编为一组</div>
      <div class="demo-row">
        <x-radio v-model="radio5" value="1">分组1-选项1</x-radio>
        <x-radio v-model="radio5" value="2">分组1-选项2</x-radio>
      </div>
      <div class="demo-row">
        <x-radio v-model="radio6" value="1">分组2-选项1</x-radio>
        <x-radio v-model="radio6" value="2">分组2-选项2</x-radio>
      </div>
    </Demo>

    <Demo title="带标签">
      <div class="demo-row">
        <x-radio v-model="radio7" value="1" label="选项1" />
        <x-radio v-model="radio7" value="2" label="选项2" />
      </div>
    </Demo>

    <Demo title="按钮样式">
      <div class="demo-row">
        <x-radio-button-group v-model="radio8">
          <x-radio-button value="1">选项1</x-radio-button>
          <x-radio-button value="2">选项2</x-radio-button>
          <x-radio-button value="3">选项3</x-radio-button>
        </x-radio-button-group>
      </div>
    </Demo>

    <Demo title="按钮尺寸">
      <div class="demo-row">
        <x-radio-button-group v-model="radio9" size="small">
          <x-radio-button value="1">小型</x-radio-button>
          <x-radio-button value="2">中等</x-radio-button>
          <x-radio-button value="3">大型</x-radio-button>
        </x-radio-button-group>
      </div>
    </Demo>

    <Demo title="按钮类型">
      <div class="demo-row">
        <x-radio-button-group v-model="radio10" type="primary">
          <x-radio-button value="1">默认</x-radio-button>
          <x-radio-button value="2">主要</x-radio-button>
          <x-radio-button value="3">成功</x-radio-button>
          <x-radio-button value="4">警告</x-radio-button>
          <x-radio-button value="5">错误</x-radio-button>
        </x-radio-button-group>
      </div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const radio1 = ref("1");
const radio2 = ref("1");
const radio3 = ref("1");
const radio4 = ref("2");
const radio5 = ref("1");
const radio6 = ref("1");
const radio7 = ref("1");
const radio8 = ref("1");
const radio9 = ref("1");
const radio10 = ref("1");
</script>

<style lang="scss" scoped>
.demo-row {
  width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.demo-desc {
  width: 100%;
  margin-bottom: 16px;
  font-size: 16px;
  color: var(--x-text-color);
}
</style>
