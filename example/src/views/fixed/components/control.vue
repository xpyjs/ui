<template>
  <x-button @click="visible = !visible">
    {{ visible ? "隐藏" : "显示" }}
  </x-button>

  <x-fixed
    v-model:visible="visible"
    :position="{ right: '200px', bottom: '400px' }"
  >
    <x-button type="secondary" shape="round">
      消失的我
      <template #icon>
        <x-icon name="mdi:star" />
      </template>
    </x-button>
  </x-fixed>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(true);
</script>

<style scoped></style>
