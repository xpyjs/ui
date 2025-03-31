---
outline: [2, 3]
---

<style>
  .scroll-wrapper {
    width: 300px;
    height: 200px;
    border: 1px solid var(--x-color-neutral-200);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  .scroll-content {
    padding: 8px;
  }

  .scroll-item {
    padding: 8px;
    margin-bottom: 8px;
    background-color: var(--x-color-neutral-100);
    border-radius: 4px;
  }

  .scroll-content.horizontal {
    display: flex;
  }

  .scroll-content.horizontal .scroll-item {
    flex-shrink: 0;
    margin-right: 8px;
  }

  .scroll-content.both {
    width: 1000px;
  }
</style>

# Scroll 滚动容器

自定义滚动条容器，提供美观且功能丰富的滚动体验。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| scrollX | `boolean` | `true` | 是否启用横向滚动 |
| scrollY | `boolean` | `true` | 是否启用纵向滚动 |
| scrollbarType | `ScrollbarType` | `'hover'` | 滚动条显示方式 |
| size | `number` | `6` | 滚动条宽度 |
| trackColor | `string` | `'rgba(0, 0, 0, 0.05)'` | 滚动条轨道颜色 |
| thumbColor | `string` | `'rgba(0, 0, 0, 0.2)'` | 滚动条滑块颜色 |
| thumbHoverColor | `string` | `'rgba(0, 0, 0, 0.4)'` | 滚动条悬停颜色 |
| contentClass | `XClass` | `''` | 内容样式类 |
| contentStyle | `XStyle` | `{}` | 内容样式 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，滚动容器内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| scroll | 滚动事件 | `(e: Event) => void` |
| scroll-end | 滚动结束事件 | `() => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <div class="scroll-wrapper">
    <x-scroll>
      <div class="scroll-content">
        <div v-for="i in 50" :key="i" class="scroll-item">
          列表项 {{ i }}
        </div>
      </div>
    </x-scroll>
  </div>
</template>
```

:::

### 滚动方向

:::demo

```vue
<template>
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
</template>
```

:::

### 滚动条样式

:::demo

```vue
<template>
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
</template>
```

:::

### 滚动条显示方式

:::demo

```vue
<template>
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
</template>
```

:::

## TypeScript

```ts
// 滚动条显示方式
export type ScrollbarType = "always" | "hover" | "never";
```
