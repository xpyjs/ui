<template>
  <x-button @click="showLoading">显示 Loading</x-button>
  <x-button @click="hideLoading">隐藏 Loading</x-button>

  <div v-loading="visible" class="loading-container">这是一个容器</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const showLoading = () => (visible.value = true);
const hideLoading = () => (visible.value = false);
</script>
