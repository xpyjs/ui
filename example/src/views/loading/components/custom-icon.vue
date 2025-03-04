<template>
  <div
    v-loading="[
      true,
      { icon: 'line-md:loading-alt-loop', iconStyle: { fontSize: '30px' } }
    ]"
    class="loading-container"
  />
  <div class="loading-name">自定义图标</div>
</template>
