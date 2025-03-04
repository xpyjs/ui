<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <div class="scroll-wrapper">
        <x-scroll>
          <div class="scroll-content">
            <div v-for="i in 50" :key="i" class="scroll-item">
              列表项 {{ i }}
            </div>
          </div>
        </x-scroll>
      </div>
    </Demo>

    <Demo title="滚动方向">
      <div class="direction-demo">
        <div class="scroll-wrapper">
          <h4>垂直滚动</h4>
          <x-scroll :scroll-x="false">
            <div class="scroll-content">
              <div v-for="i in 50" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>

        <div class="scroll-wrapper">
          <h4>水平滚动</h4>
          <x-scroll :scroll-y="false">
            <div class="scroll-content horizontal">
              <div v-for="i in 50" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>

        <div class="scroll-wrapper">
          <h4>双向滚动</h4>
          <x-scroll>
            <div class="scroll-content both">
              <div v-for="i in 100" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>
      </div>
    </Demo>

    <Demo title="滚动条样式">
      <div class="style-demo">
        <div class="scroll-wrapper">
          <h4>自定义颜色</h4>
          <x-scroll
            track-color="rgba(100, 100, 100, 0.1)"
            thumb-color="rgba(100, 100, 100, 0.3)"
            thumb-hover-color="rgba(100, 100, 100, 0.5)"
          >
            <div class="scroll-content">
              <div v-for="i in 50" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>

        <div class="scroll-wrapper">
          <h4>滚动条宽度</h4>
          <x-scroll :size="12">
            <div class="scroll-content">
              <div v-for="i in 50" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>
      </div>
    </Demo>

    <Demo title="滚动条显示方式">
      <div class="display-demo">
        <div class="scroll-wrapper">
          <h4>始终显示</h4>
          <x-scroll scrollbar-type="always">
            <div class="scroll-content">
              <div v-for="i in 50" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>

        <div class="scroll-wrapper">
          <h4>悬停显示</h4>
          <x-scroll scrollbar-type="hover">
            <div class="scroll-content">
              <div v-for="i in 50" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>

        <div class="scroll-wrapper">
          <h4>从不显示</h4>
          <x-scroll scrollbar-type="never">
            <div class="scroll-content">
              <div v-for="i in 50" :key="i" class="scroll-item">
                列表项 {{ i }}
              </div>
            </div>
          </x-scroll>
        </div>
      </div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  width: 300px;
  height: 200px;
  border: 1px solid var(--x-color-neutral-200);
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    padding: 8px;
    font-size: 14px;
    border-bottom: 1px solid var(--x-color-neutral-200);
  }
}

.scroll-content {
  padding: 8px;

  &.horizontal {
    display: flex;
    .scroll-item {
      flex-shrink: 0;
      margin-right: 8px;
    }
  }

  &.both {
    width: 1000px;
  }
}

.scroll-item {
  padding: 8px;
  margin-bottom: 8px;
  background-color: var(--x-color-neutral-100);
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
}

.direction-demo,
.style-demo,
.display-demo {
  display: flex;
  gap: 24px;
}
</style>
