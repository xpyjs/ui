---
outline: [2, 3]
---

<style>
  li + li {
    margin-top: 0 !important;
  }
</style>

# 面包屑

面包屑组件用于显示当前页面在层级结构中的位置，帮助用户了解当前所在的位置。
面包屑通常用于多层级的页面导航，用户可以通过点击面包屑中的链接快速返回上一级或更高层级的页面。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `string` | `default` | 面包屑类型，支持 `default` 和 `icon` |
| items | `BreadcrumbItem[]` | `[]` | 面包屑数据，包含每个面包屑项的文本和链接等信息 |
| separator | `string` | `/` | 分隔符，用于分隔面包屑项 |
| separatorIcon | `string` | `>` | 分隔符图标，用于分隔面包屑项，优先级高于 `separator` |

### Events

| 名称           | 描述               | 参数 |
| -------------- | ------------------ | ---- |
| click          | 点击事件           | (item: BreadcrumbItem) => void |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-breadcrumb
    :items="[{ label: '首页' }, { label: '列表页' }, { label: '详情页' }]"
  />

  <x-breadcrumb
    :items="[
      { label: '首页', to: '/' },
      { label: '列表页', to: '/list' },
      { label: '详情页' }
    ]"
  />
</template>
```

:::

### 带图标的面包屑

:::demo

```vue
<template>
  <x-breadcrumb
    :items="[
      { label: '首页', to: '/', icon: 'mdi:home' },
      { label: '列表页', to: '/list', icon: 'mdi:format-list-bulleted' },
      { label: '详情页', icon: 'mdi:file-document-outline' }
    ]"
  />
</template>
```

:::

### 自定义分隔符

:::demo

```vue
<template>
  <x-breadcrumb
    separator=">"
    :items="[
      { label: '首页', to: '/' },
      { label: '列表页', to: '/list' },
      { label: '详情页' }
    ]"
    />

  <x-breadcrumb
    separator="/"
    :items="[
      { label: '首页', to: '/' },
      { label: '列表页', to: '/list' },
      { label: '详情页' }
    ]"
  />
</template>
```

:::

### 使用图标分隔符

:::demo

```vue
<template>
<x-breadcrumb
        separator-icon="mdi:chevron-right"
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', to: '/list' },
          { label: '详情页' }
        ]"
      />
</template>
```

:::

### 自定义点击事件

:::demo

```vue
<template>
      <x-breadcrumb
        :items="[
          {
            label: '首页',
            action: () => onClick('首页')
          },
          {
            label: '列表页',
            action: () => onClick('列表页')
          },
          { label: '详情页' }
        ]"
      />
</template>
<script setup lang="ts">
const onClick = (item: string) => {
    console.log('当前选中:', item);
};
</script>
```

:::

### 禁用状态

:::demo

```vue
<template>
      <x-breadcrumb
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', disabled: true },
          { label: '详情页' }
        ]"
      />
</template>
```

:::

### 自定义样式

:::demo

```vue
<template>
      <x-breadcrumb
        :items="[
          { label: '首页', to: '/', class: 'custom-item' },
          { label: '列表页', to: '/list', class: 'custom-item' },
          { label: '详情页', class: 'custom-item' }
        ]"
      />
</template>
<style scoped>
.custom-item {
    color: #42b983;
    font-weight: bold;
    text-decoration: underline;
}
.custom-item:hover {
    color: #35495e;
    text-decoration: none;
}
</style>
```

:::

### 不同类型

:::demo

```vue
<template>
      <x-breadcrumb
        type="default"
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', to: '/list' },
          { label: '详情页' }
        ]"
      />
      <x-breadcrumb
        type="primary"
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', to: '/list' },
          { label: '详情页' }
        ]"
      />
      <x-breadcrumb
        type="success"
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', to: '/list' },
          { label: '详情页' }
        ]"
      />
      <x-breadcrumb
        type="warning"
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', to: '/list' },
          { label: '详情页' }
        ]"
      />
      <x-breadcrumb
        type="error"
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', to: '/list' },
          { label: '详情页' }
        ]"
      />
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

export interface BreadcrumbItem {
  /**
   * 显示的文本(必需)
   */
  label: string;
  /**
   * 跳转的路由路径
   */
  to?: string;
  /**
   * 点击事件
   */
  action?: () => void;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义图标
   */
  icon?: string;
  /**
   * 额外的类名
   */
  class?: string;
}
```
