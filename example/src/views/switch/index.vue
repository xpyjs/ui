<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-switch v-model="checked" />
    </Demo>

    <Demo title="不同尺寸">
      <x-switch v-model="checked" size="small" />
      <x-switch v-model="checked" size="medium" />
      <x-switch v-model="checked" size="large" />
    </Demo>

    <Demo title="不同类型">
      <x-switch v-model="checked" type="default" />
      <x-switch v-model="checked" type="primary" />
      <x-switch v-model="checked" type="success" />
      <x-switch v-model="checked" type="warning" />
      <x-switch v-model="checked" type="error" />
    </Demo>

    <Demo title="禁用状态">
      <x-switch v-model="checked" disabled />
      <x-switch v-model="checked2" disabled />
    </Demo>

    <Demo title="自定义颜色">
      <x-switch
        v-model="checked"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </Demo>

    <Demo title="文字描述">
      <x-switch v-model="checked" active-text="开启" inactive-text="关闭" />
    </Demo>

    <Demo title="图标">
      <x-switch
        v-model="checked"
        active-icon="mdi:check"
        inactive-icon="mdi:close"
      />
      <x-switch v-model="checked">
        <template #activeIcon>
          <x-icon name="mdi:check" />
        </template>
        <template #inactiveIcon>
          <x-icon name="mdi:close" />
        </template>
      </x-switch>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const checked = ref(true);
const checked2 = ref(false);
</script>
