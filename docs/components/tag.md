---
outline: [2, 3]
---

<style>
  .x-tag {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Tag 标签

标签组件用于标记和分类内容。它允许用户快速识别和过滤信息，通常用于展示状态、属性和分类。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `ComponentType` | `'default'` | 标签类型 |
| size | `ComponentSize` | `'medium'` | 标签大小 |
| variant | `ComponentVariant` | `'light'` | 标签变体 |
| shape | `ComponentShape` | `'default'` | 标签形状 |
| closable | `boolean` | `false` | 是否可关闭 |
| disabled | `boolean` | `false` | 是否禁用 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于显示标签内容 | - |
| icon | 图标插槽，用于显示标签前置图标 | - |
| close | 关闭图标插槽，可自定义关闭按钮 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| close | 关闭标签时触发 | `(event: MouseEvent) => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-tag>默认标签</x-tag>
  <x-tag type="primary">主要标签</x-tag>
  <x-tag type="success">成功标签</x-tag>
  <x-tag type="warning">警告标签</x-tag>
  <x-tag type="error">错误标签</x-tag>
  <x-tag type="info">信息标签</x-tag>
</template>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <x-tag size="small">小型标签</x-tag>
  <x-tag size="medium">中型标签</x-tag>
  <x-tag size="large">大型标签</x-tag>
</template>
```

:::

### 不同样式

:::demo

```vue
<template>
  <div class="demo-row">
    <div class="demo-desc">填充样式</div>
    <x-tag type="primary" variant="filled">填充标签</x-tag>
    <x-tag type="success" variant="filled">填充标签</x-tag>
    <x-tag type="warning" variant="filled">填充标签</x-tag>
    <x-tag type="error" variant="filled">填充标签</x-tag>
  </div>

  <div class="demo-row">
    <div class="demo-desc">浅色样式(默认)</div>
    <x-tag type="primary" variant="light">浅色标签</x-tag>
    <x-tag type="success" variant="light">浅色标签</x-tag>
    <x-tag type="warning" variant="light">浅色标签</x-tag>
    <x-tag type="error" variant="light">浅色标签</x-tag>
  </div>

  <div class="demo-row">
    <div class="demo-desc">描边样式</div>
    <x-tag type="primary" variant="outlined">描边标签</x-tag>
    <x-tag type="success" variant="outlined">描边标签</x-tag>
    <x-tag type="warning" variant="outlined">描边标签</x-tag>
    <x-tag type="error" variant="outlined">描边标签</x-tag>
  </div>
</template>

<style>
.demo-row {
  margin-bottom: 16px;
}
.demo-desc {
  margin-bottom: 8px;
  color: var(--x-text-color-secondary);
  font-size: 14px;
}
</style>
```

:::

### 不同形状

:::demo

```vue
<template>
  <x-tag shape="default" type="primary">默认形状</x-tag>
  <x-tag shape="round" type="success">圆角标签</x-tag>
  <x-tag shape="circle" type="warning">圆</x-tag>
</template>
```

:::

### 可关闭标签

:::demo

```vue
<template>
  <x-tag closable @close="onClose">可关闭标签</x-tag>
  <x-tag closable type="primary" @close="onClose">可关闭标签</x-tag>
  <x-tag closable type="success" @close="onClose">可关闭标签</x-tag>

  <div style="margin-top: 16px;">
    <x-tag
      v-for="(tag, index) in tags"
      :key="index"
      closable
      type="primary"
      @close="handleClose(index)"
    >
      {{ tag }}
    </x-tag>
  </div>

  <x-button size="small" style="margin-top: 16px;" @click="addTag">
    + 添加标签
  </x-button>
</template>

<script setup>
import { ref } from 'vue';

const onClose = (event) => {
  console.log('标签被关闭', event);
};

const tags = ref(['标签1', '标签2', '标签3']);

const handleClose = (index) => {
  tags.value.splice(index, 1);
};

const addTag = () => {
  tags.value.push(`标签${tags.value.length + 1}`);
};
</script>
```

:::

### 带图标的标签

:::demo

```vue
<template>
  <x-tag>
    <template #icon>
      <x-icon name="mdi:home" />
    </template>
    首页
  </x-tag>

  <x-tag type="success">
    <template #icon>
      <x-icon name="mdi:check" />
    </template>
    成功
  </x-tag>

  <x-tag type="warning">
    <template #icon>
      <x-icon name="mdi:alert" />
    </template>
    警告
  </x-tag>

  <x-tag type="error">
    <template #icon>
      <x-icon name="mdi:close" />
    </template>
    错误
  </x-tag>
</template>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <x-tag disabled>禁用标签</x-tag>
  <x-tag disabled type="primary">禁用标签</x-tag>
  <x-tag disabled closable>禁用关闭</x-tag>
</template>
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
