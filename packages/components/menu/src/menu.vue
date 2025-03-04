<template>
  <XPopup
    v-model:visible="visible"
    :trigger="trigger"
    :placement="placement"
    :disabled="disabled"
    :enterable="true"
    @show="emit('open')"
    @hide="emit('close')"
  >
    <template #default>
      <slot />
    </template>

    <template #content>
      <div class="x-menu">
        <menu-list :items="menu" @select="handleSelect" :trigger="trigger" />
      </div>
    </template>
  </XPopup>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { menuEmits, type MenuProps } from "./props";
import MenuList from "./menu-list.vue";
import type { MenuItem } from "@/types/menu";
import { XPopup } from "@/components/popup";

defineOptions({
  name: "XMenu"
});

const props = withDefaults(defineProps<MenuProps>(), {
  trigger: "click",
  placement: "bottom-start"
});
const emit = defineEmits(menuEmits);

const visible = ref(false);

const handleSelect = (item: MenuItem) => {
  if (item.disabled) return;

  emit("select", item);
  item.action?.();
  visible.value = false;
};
</script>
