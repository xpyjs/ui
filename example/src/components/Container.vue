<template>
  <div class="demo-container">
    <h1>{{ title }}</h1>
    <p class="demo-desc">{{ desc }}</p>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  desc?: string;
}>();

defineOptions({
  name: "Container"
});
</script>

<style lang="scss" scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 28px;
    margin-bottom: 12px;
    color: var(--x-color-neutral-900);
  }

  .demo-desc {
    color: var(--x-color-neutral-600);
    margin-bottom: 32px;
  }
}
</style>
