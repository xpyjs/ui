<template>
  <div class="demo-container">
    <Demo title="按钮类型">
      <Basic />
    </Demo>

    <Demo title="按钮变体">
      <Variant />
    </Demo>

    <Demo title="按钮形状">
      <Shape />
    </Demo>

    <Demo title="按钮尺寸">
      <Size />
    </Demo>

    <Demo title="按钮状态">
      <Status />
    </Demo>

    <Demo title="按钮事件">
      <Event />
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Basic from "./components/basic.vue";
import Variant from "./components/variant.vue";
import Shape from "./components/shape.vue";
import Size from "./components/size.vue";
import Status from "./components/status.vue";
import Event from "./components/event.vue";
</script>

<style lang="scss" scoped></style>
