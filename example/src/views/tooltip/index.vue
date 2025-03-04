<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <div class="demo-row">
        <x-tooltip content="这是一个提示">
          <x-button>鼠标移入查看</x-button>
        </x-tooltip>
      </div>
    </Demo>

    <Demo title="不同位置">
      <div class="demo-row">
        <x-tooltip content="Top 提示" placement="top">
          <x-button>Top</x-button>
        </x-tooltip>
        <x-tooltip content="Bottom 提示" placement="bottom">
          <x-button>Bottom</x-button>
        </x-tooltip>
        <x-tooltip content="Left 提示" placement="left">
          <x-button>Left</x-button>
        </x-tooltip>
        <x-tooltip content="Right 提示" placement="right">
          <x-button>Right</x-button>
        </x-tooltip>
      </div>
    </Demo>

    <Demo title="反转颜色">
      <div class="demo-row">
        <x-tooltip content="反色提示框" inverse>
          <x-button>鼠标移入查看</x-button>
        </x-tooltip>
      </div>
    </Demo>

    <Demo title="延迟显示/隐藏">
      <div class="demo-row">
        <x-tooltip content="延迟 500ms 显示" :show-delay="500">
          <x-button>延迟显示</x-button>
        </x-tooltip>
        <x-tooltip content="延迟 500ms 隐藏" :hide-delay="500">
          <x-button>延迟隐藏</x-button>
        </x-tooltip>
      </div>
    </Demo>

    <Demo title="可进入提示框">
      <div class="demo-row">
        <x-tooltip content="鼠标可以移入此提示框" :enterable="true">
          <x-button>移入查看</x-button>
        </x-tooltip>
      </div>
    </Demo>

    <Demo title="多行文本">
      <div class="demo-row">
        <x-tooltip
          content="这是一个多行文本的提示框\n这是一段描述文本\n这是一段描述文本"
        >
          <x-button>查看详情</x-button>
        </x-tooltip>

        <x-tooltip
          content="这是一个多行文本的提示框\n这是一段描述文本\n这是一段描述文本"
          :enterable="true"
        >
          <x-button>可进入提示框查看</x-button>
        </x-tooltip>
      </div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
</script>

<style lang="scss" scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

.custom-tooltip {
  h4 {
    margin: 0 0 8px;
    font-size: var(--x-font-size-base);
  }

  p {
    margin: 0 0 8px;
    font-size: var(--x-font-size-small);
    color: var(--x-text-color-secondary);
  }
}
</style>
