<template>
  <ul class="x-menu-list">
    <template v-for="item in items" :key="item.id">
      <!-- 分隔符 -->
      <li v-if="item.type === 'divider'" class="x-menu-divider"></li>

      <!-- 子菜单 -->
      <XPopup
        v-else-if="item.children?.length"
        :trigger="trigger"
        placement="right-start"
        :disabled="item.disabled"
        :enterable="true"
        :offset="14"
        :show-arrow="false"
        :appendTo="null"
      >
        <template #default>
          <MenuItem class="x-menu-submenu" :item="item" />
        </template>

        <template #content>
          <menu-list
            :items="item.children"
            :trigger="trigger"
            @select="emit('select', $event)"
          />
        </template>
      </XPopup>

      <!-- 菜单项 -->
      <MenuItem v-else :item="item" @select="$emit('select', $event)" />
    </template>
  </ul>
</template>

<script lang="ts" setup>
import type { MenuItem as IMenuItem } from "@/types/menu";
import { XPopup } from "@/components/popup";
import MenuItem from "./menu-item.vue";
import type { TriggerType } from "@/components/popup/src/types";

defineProps<{
  items: IMenuItem[];
  trigger: TriggerType;
}>();

const emit = defineEmits<{
  select: [item: IMenuItem];
}>();
</script>
