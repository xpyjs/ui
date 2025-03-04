<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-icon name="icon-park-outline:handle-a" />
      <x-icon name="icon-park-outline:handle-b" />
      <x-icon name="icon-park-outline:handle-c" />
    </Demo>

    <Demo title="本地图标">
      <x-icon :name="`url:${addIcon2}`" size="16" />
      <x-icon :content="addIcon" size="40" />
      <x-icon :content="localIcon" size="20" />
    </Demo>

    <Demo title="自定义颜色">
      <x-icon name="icon-park-outline:handle-a" color="#f00" />
      <x-icon name="icon-park-outline:handle-b" color="#0f0" />
      <x-icon name="icon-park-outline:handle-c" color="#00f" />
    </Demo>

    <Demo title="自定义大小">
      <x-icon name="icon-park-outline:handle-a" color="#f00" size="24" />
      <x-icon name="icon-park-outline:handle-b" color="#0f0" size="32" />
      <x-icon name="icon-park-outline:handle-c" color="#00f" size="40" />
      <x-icon :content="localIcon" size="24px" />
      <x-icon :content="localIcon" size="1em" />
      <x-icon :content="localIcon" size="4rem" />
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
import addIcon from "./icons/add.svg?raw";
import addIcon2 from "./icons/add.svg";

const localIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"></path></svg>`;
</script>

<style lang="scss" scoped></style>
