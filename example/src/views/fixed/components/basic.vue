<template>
  <div>右下角按钮</div>

  <x-fixed :position="{ right: '20px', bottom: '20px' }">
    <x-button type="primary" shape="circle" size="large" @click="handleClick">
      <template #icon>
        <x-icon name="mdi:arrow-up" />
      </template>
    </x-button>
  </x-fixed>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log("click");
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};
</script>
