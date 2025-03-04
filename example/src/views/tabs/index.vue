<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <Basic />
    </Demo>

    <Demo title="指定展示的页签">
      <Target />
    </Demo>

    <Demo title="不同类型">
      <Indicator />
    </Demo>

    <Demo title="纵向">
      <Direction />
    </Demo>

    <Demo title="带图标">
      <Icon />
    </Demo>

    <Demo title="可关闭">
      <Close />
    </Demo>

    <Demo title="可新增">
      <Add />
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
import Basic from "./components/basic.vue";
import Direction from "./components/direction.vue";
import Icon from "./components/icon.vue";
import Close from "./components/close.vue";
import Add from "./components/add.vue";
import Indicator from "./components/indicator.vue";
import Target from "./components/target.vue";
</script>

<style lang="scss">
.demo-desc {
  margin: 16px 0 8px;
  color: var(--x-text-color-secondary);
  font-size: 14px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
