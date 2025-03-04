<template>
  <x-button type="primary" disabled>禁用按钮</x-button>
  <x-button type="primary" loading>加载中</x-button>
  <x-button type="primary" loading :loading-options="{ type: 'wave' }">
    自定义加载图标
  </x-button>
  <x-button type="primary" flat>扁平按钮</x-button>
</template>
