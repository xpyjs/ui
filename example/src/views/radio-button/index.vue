<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <div class="demo-row">
        <x-radio-button-group v-model="radio1">
          <x-radio-button value="1">选项1</x-radio-button>
          <x-radio-button value="2">选项2</x-radio-button>
          <x-radio-button value="3">选项3</x-radio-button>
        </x-radio-button-group>
      </div>
    </Demo>

    <Demo title="不同尺寸">
      <div class="demo-row">
        <x-radio-button-group v-model="radio2" size="small">
          <x-radio-button value="1">小型</x-radio-button>
          <x-radio-button value="2">选项</x-radio-button>
          <x-radio-button value="3">按钮</x-radio-button>
        </x-radio-button-group>
      </div>
      <div class="demo-row">
        <x-radio-button-group v-model="radio3" size="medium">
          <x-radio-button value="1">中等</x-radio-button>
          <x-radio-button value="2">选项</x-radio-button>
          <x-radio-button value="3">按钮</x-radio-button>
        </x-radio-button-group>
      </div>
      <div class="demo-row">
        <x-radio-button-group v-model="radio4" size="large">
          <x-radio-button value="1">大型</x-radio-button>
          <x-radio-button value="2">选项</x-radio-button>
          <x-radio-button value="3">按钮</x-radio-button>
        </x-radio-button-group>
      </div>
    </Demo>

    <Demo title="不同类型">
      <div class="demo-row">
        <x-radio-button-group v-model="radio5" type="default">
          <x-radio-button value="1">默认</x-radio-button>
          <x-radio-button value="2">按钮</x-radio-button>
          <x-radio-button value="3">选项</x-radio-button>
        </x-radio-button-group>
      </div>
      <div class="demo-row">
        <x-radio-button-group v-model="radio6" type="primary">
          <x-radio-button value="1">主要</x-radio-button>
          <x-radio-button value="2">按钮</x-radio-button>
          <x-radio-button value="3">选项</x-radio-button>
        </x-radio-button-group>
      </div>
      <div class="demo-row">
        <x-radio-button-group v-model="radio7" type="success">
          <x-radio-button value="1">成功</x-radio-button>
          <x-radio-button value="2">按钮</x-radio-button>
          <x-radio-button value="3">选项</x-radio-button>
        </x-radio-button-group>
      </div>
      <div class="demo-row">
        <x-radio-button-group v-model="radio8" type="warning">
          <x-radio-button value="1">警告</x-radio-button>
          <x-radio-button value="2">按钮</x-radio-button>
          <x-radio-button value="3">选项</x-radio-button>
        </x-radio-button-group>
      </div>
      <div class="demo-row">
        <x-radio-button-group v-model="radio9" type="error">
          <x-radio-button value="1">错误</x-radio-button>
          <x-radio-button value="2">按钮</x-radio-button>
          <x-radio-button value="3">选项</x-radio-button>
        </x-radio-button-group>
      </div>

      <div class="demo-desc">单独设置类型</div>

      <div class="demo-row">
        <x-radio-button-group v-model="radio9">
          <x-radio-button value="1" type="default">默认</x-radio-button>
          <x-radio-button value="2" type="primary">主要</x-radio-button>
          <x-radio-button value="3" type="success">成功</x-radio-button>
          <x-radio-button value="4" type="warning">警告</x-radio-button>
          <x-radio-button value="5" type="error">错误</x-radio-button>
        </x-radio-button-group>
      </div>
    </Demo>

    <Demo title="禁用状态">
      <div class="demo-row">
        <x-radio-button-group v-model="radio10" disabled>
          <x-radio-button value="1">禁用</x-radio-button>
          <x-radio-button value="2">状态</x-radio-button>
          <x-radio-button value="3">按钮</x-radio-button>
        </x-radio-button-group>
      </div>
      <div class="demo-row">
        <x-radio-button-group v-model="radio11">
          <x-radio-button value="1">正常</x-radio-button>
          <x-radio-button value="2" disabled>禁用</x-radio-button>
          <x-radio-button value="3">正常</x-radio-button>
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
const radio4 = ref("1");
const radio5 = ref("1");
const radio6 = ref("1");
const radio7 = ref("1");
const radio8 = ref("1");
const radio9 = ref("1");
const radio10 = ref("1");
const radio11 = ref("1");
</script>

<style lang="scss" scoped>
.demo-row {
  width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
