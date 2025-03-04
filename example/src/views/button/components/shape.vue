<template>
  <x-button type="primary" shape="default">默认按钮</x-button>
  <x-button type="primary" shape="round">圆角按钮</x-button>
  <x-button type="primary" shape="circle">
    <template #icon>
      <x-icon name="mdi:add"></x-icon>
    </template>
  </x-button>
  <x-button type="primary" shape="round">
    <template #icon>
      <x-icon name="mdi:home"></x-icon>
    </template>
    带图标的按钮
  </x-button>
  <x-button type="primary" shape="square">方形按钮</x-button>
</template>
