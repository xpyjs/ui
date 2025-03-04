<template>
  <x-button type="primary" @click="handleClick">点击事件</x-button>
  <x-button type="primary" @longpress="handleLongPress">长按事件</x-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert("按钮被点击了！");
};

const handleLongPress = () => {
  alert("按钮被长按了！");
};
</script>
