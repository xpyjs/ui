<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-collapse label="点击展开/收起">
        <div class="content">
          这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
        </div>
      </x-collapse>

      <x-collapse v-model:visible="expanded1" label="点击展开/收起">
        <div class="content">
          这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
        </div>
      </x-collapse>
    </Demo>

    <Demo title="自定义触发器">
      <x-collapse>
        <template #trigger>
          <div class="trigger-content">点我</div>
        </template>
        <div class="content">
          这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
        </div>
      </x-collapse>
    </Demo>

    <Demo title="指定高度">
      <x-collapse size="100px" label="固定高度100px">
        <div class="content">
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
        </div>
      </x-collapse>

      <x-collapse size="50px" label="固定高度50px">
        <div class="content">
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
          <div>
            这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
          </div>
        </div>
      </x-collapse>
    </Demo>

    <Demo title="横向折叠">
      <x-collapse direction="horizontal" label="横向折叠">
        <div class="content-horizontal">
          <div style="white-space: nowrap" v-for="i in 5" :key="i">
            内容项 {{ i }}
          </div>
        </div>
      </x-collapse>
    </Demo>

    <Demo title="禁用状态">
      <x-collapse disabled label="禁用状态">
        <div class="content">这是一段被禁用的折叠内容。</div>
      </x-collapse>
    </Demo>

    <Demo title="折叠组模式">
      <x-collapse-group v-model="activePanels">
        <x-collapse v-for="i in 3" :key="i" :name="i" :label="`面板 ${i}`">
          <div class="content">
            这是第 {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。 这是第
            {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。
          </div>
        </x-collapse>
      </x-collapse-group>
    </Demo>

    <Demo title="折叠组模式-横向">
      <x-collapse-group v-model="activePanels" direction="horizontal">
        <x-collapse v-for="i in 3" :key="i" :name="i" :label="`面板 ${i}`">
          <div class="content">
            这是第 {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。 这是第
            {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。
          </div>
        </x-collapse>
      </x-collapse-group>
    </Demo>

    <Demo title="手风琴模式">
      <x-collapse-group v-model:active="activePanel" accordion>
        <x-collapse v-for="i in 3" :key="i" :name="i" :label="`面板 ${i}`">
          <div class="content">
            这是第 {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。 这是第
            {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。
          </div>
        </x-collapse>
      </x-collapse-group>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const expanded1 = ref(true);
const activePanels = ref<(string | number)[]>([1]);
const activePanel = ref("");
</script>

<style lang="scss" scoped>
.trigger-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--x-color-primary-300);
  color: var(--x-color-success-600);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--x-color-primary-200);
  }
}
</style>
