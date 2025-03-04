<template>
  <div ref="containerRef" class="loading-container">钩子方法调用</div>
  <x-button @click="hookLoading = !hookLoading">切换状态</x-button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLoading } from "../../../../../packages";

const hookLoading = ref(false);
const containerRef = ref<HTMLElement>();

onMounted(() => {
  const { close } = useLoading(containerRef, hookLoading);
});
</script>
