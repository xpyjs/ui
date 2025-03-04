<template>
  <x-button
    v-loading="[visible2, { fullscreen: true }]"
    @click="showFullscreenLoading"
  >
    显示全屏 Loading
  </x-button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible2 = ref(false);
const showFullscreenLoading = () => {
  visible2.value = true;
  setTimeout(() => {
    visible2.value = false;
  }, 3000);
};
</script>
