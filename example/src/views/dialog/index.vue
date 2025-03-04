<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <Basic />
    </Demo>

    <Demo title="全屏对话框">
      <Fullscreen />
    </Demo>

    <Demo title="自定义宽度">
      <Width />
    </Demo>

    <Demo title="内容高度过长">
      <Height />
    </Demo>

    <Demo title="子对话框">
      <Nest />
    </Demo>

    <Demo title="事件演示">
      <Event />
    </Demo>

    <Demo title="命令式创建">
      <Programmatic />
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
import Basic from "./components/basic.vue";
import Fullscreen from "./components/fullscreen.vue";
import Width from "./components/width.vue";
import Height from "./components/height.vue";
import Nest from "./components/nest.vue";
import Event from "./components/event.vue";
import Programmatic from "./components/programmatic.vue";
</script>

<style lang="scss">
.dialog-content {
  line-height: 1.6;

  p {
    margin: 12px 0;
  }
}
</style>
