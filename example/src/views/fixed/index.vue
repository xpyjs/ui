<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <Basic />
    </Demo>

    <Demo title="自定义位置">
      <Position />
    </Demo>

    <Demo title="使用拖拽">
      <Drag />
    </Demo>

    <Demo title="指定挂载目标">
      <Target />
    </Demo>

    <Demo title="显示/隐藏">
      <Control />
    </Demo>

    <Demo title="回到顶部示例">
      <BackTop />
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
import Basic from "./components/basic.vue";
import Position from "./components/position.vue";
import Drag from "./components/drag.vue";
import Target from "./components/target.vue";
import Control from "./components/control.vue";
import BackTop from "./components/backTop.vue";
</script>
