<template>
  <div class="loading-types">
    <div v-for="(type, i) in types" :key="type" class="loading-type">
      <div class="loading-box">
        <x-loading :visible="typesLoading[i]" :type="type" :mask="false" />
      </div>
      <x-button
        type="secondary"
        variant="text"
        @click="typesLoading[i] = !typesLoading[i]"
      >
        {{ type }}
      </x-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const types = ["spinner", "dots", "snake", "pulse", "wave"] as const;
const typesLoading = ref([true, true, true, true, true]);
</script>
