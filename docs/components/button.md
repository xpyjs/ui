---
outline: [2, 3]
---

<style>
  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Button 按钮

常用的操作按钮

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `ComponentType` | `'default'` | 按钮类型 |
| size | `ComponentSize` | `'medium'` | 按钮大小 |
| variant | `ComponentVariant` | `'filled'` | 按钮变体款式 |
| shape | `ComponentShape` | `'default'` | 按钮外观形状 |
| disabled | `boolean` | `false` | 按钮是否禁用 |
| loading | `boolean` | `false` | 按钮是否加载中 |
| loadingOptions | `LoadingProps` | - | 按钮加载选项 |
| flat | `boolean` | `false` | 按钮是否扁平化 |
| ripple | `boolean` | `true` | 按钮水波纹效果 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于显示按钮的主要内容 | - |
| loading | loading 状态的图标插槽 | - |
| icon | 图标插槽，用于显示按钮的前置图标 | - |

### Events

| 名称           | 描述               | 参数 |
| -------------- | ------------------ | ---- |
| click          | 点击事件           | () => void |
| longpress      | 长按事件           | () => void |

## 示例

### 基础按钮

:::demo

```vue
<template>
  <x-button>默认按钮</x-button>
  <x-button type="primary">主要按钮</x-button>
  <x-button type="secondary">次要按钮</x-button>
  <x-button type="success">成功按钮</x-button>
  <x-button type="info">信息按钮</x-button>
  <x-button type="warning">警告按钮</x-button>
  <x-button type="error">错误按钮</x-button>
</template>
```

:::

### 变体

:::demo

```vue
<template>
  <x-button type="primary" variant="filled">填充按钮</x-button>
  <x-button type="primary" variant="light">浅色按钮</x-button>
  <x-button type="primary" variant="outlined">描边按钮</x-button>
  <x-button type="primary" variant="text">文本按钮</x-button>
</template>
```

:::

### 形状

:::demo

```vue
<template>
  <x-button type="primary" shape="default">默认按钮</x-button>
  <x-button type="primary" shape="round">圆角按钮</x-button>
  <x-button type="primary" shape="circle">
    <template #icon>
      <x-icon name="mdi:add"></x-icon>
    </template>
  </x-button>
  <x-button type="primary" shape="round">
    <template #icon>
      <x-icon name="mdi:home"></x-icon>
    </template>
    带图标的按钮
  </x-button>
  <x-button type="primary" shape="square">方形按钮</x-button>
</template>
```

:::

### 尺寸

:::demo

```vue
<template>
  <x-button type="primary" size="small">小型按钮</x-button>
  <x-button type="primary" size="medium">中型按钮</x-button>
  <x-button type="primary" size="large">大型按钮</x-button>
</template>
```

:::

### 状态

:::demo

```vue
<template>
  <x-button type="primary" disabled>禁用按钮</x-button>
  <x-button type="primary" loading>加载中</x-button>
  <x-button type="primary" loading :loading-options="{ type: 'wave' }">
    自定义加载图标
  </x-button>
  <x-button type="primary" flat>扁平按钮</x-button>
</template>
```

:::

### 事件

:::demo

```vue
<template>
  <x-button type="primary" @click="handleClick">点击事件</x-button>
  <x-button type="primary" @longpress="handleLongPress">长按事件</x-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert("按钮被点击了！");
};

const handleLongPress = () => {
  alert("按钮被长按了！");
};
</script>

```

:::

## TypeScript

```ts
// 基础颜色类型
export type ComponentType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// 组件尺寸
export type ComponentSize = "small" | "medium" | "large";

// 组件变体
export type ComponentVariant = "filled" | "light" | "outlined" | "text";

// 组件形状
export type ComponentShape = "default" | "round" | "circle" | "square";
```
