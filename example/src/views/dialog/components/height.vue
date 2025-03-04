<template>
  <XButton @click="visible1 = true">内容高度过长，没有设置高度</XButton>
  <XDialog v-model:visible="visible1" title="内容过长">
    <div class="dialog-content">
      <template v-for="i in 100" :key="i">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </template>
    </div>
  </XDialog>

  <XButton @click="visible2 = true">内容高度过长，设置高度</XButton>
  <XDialog v-model:visible="visible2" title="内容过长" body-height="500px">
    <div class="dialog-content">
      <template v-for="i in 100" :key="i">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </template>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible1 = ref(false);
const visible2 = ref(false);
</script>
