---
outline: [2, 3]
---

<style>
  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Tooltip 提示

Tooltip 提示组件用于在用户鼠标悬停时，显示提示信息。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| content | `string` | `''` | 提示内容 |
| inverse | `boolean` | `false` | 是否反转颜色 |
| showDelay | `number` | `200` | 移入延迟时间(ms) |
| hideDelay | `number` | `0` | 移出延迟时间(ms) |
| enterable | `boolean` | `false` | 是否可以移入弹窗 |
| placement | `PlacementType` | `'top'` | 弹出位置 |
| offset | `number` | - | 弹出偏移量 |
| showArrow | `boolean` | - | 是否显示箭头 |
| disabled | `boolean` | - | 是否禁用 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，触发提示的元素 | - |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-tooltip content="这是一个提示">
    <x-button>鼠标移入查看</x-button>
  </x-tooltip>
</template>
```

:::

### 不同位置

:::demo

```vue
<template>
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
</template>

<style>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```

:::

### 反转颜色

:::demo

```vue
<template>
  <x-tooltip content="反色提示框" inverse>
    <x-button>鼠标移入查看</x-button>
  </x-tooltip>
</template>
```

:::

### 延迟显示/隐藏

:::demo

```vue
<template>
  <x-tooltip content="延迟 500ms 显示" :show-delay="500">
    <x-button>延迟显示</x-button>
  </x-tooltip>
  <x-tooltip content="延迟 500ms 隐藏" :hide-delay="500">
    <x-button>延迟隐藏</x-button>
  </x-tooltip>
</template>
```

:::

### 可进入提示框

:::demo

```vue
<template>
  <x-tooltip content="鼠标可以移入此提示框" :enterable="true">
    <x-button>移入查看</x-button>
  </x-tooltip>
</template>
```

:::

### 多行文本

:::demo

```vue
<template>
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
</template>
```

:::

## TypeScript

```ts
// 弹出位置类型
export type PlacementType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';
```
