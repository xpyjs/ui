<template>
  <div>禁用拖拽 { right: '120px', bottom: '40px' }</div>

  <x-fixed :draggable="true" :position="{ right: '120px', bottom: '40px' }">
    <x-button type="success">
      拖拽我
      <template #icon>
        <x-icon name="mdi:heart" />
      </template>
    </x-button>
  </x-fixed>
</template>
