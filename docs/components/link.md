---
outline: [2, 3]
---

<style>
  .x-link {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }

  .vp-doc a {
    text-decoration: none
  }
</style>

# Link 链接

文字超链接组件

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `ComponentType` | `'default'` | 链接类型 |
| href | `string` | `'#'` | 链接地址 |
| target | `string` | - | 链接打开方式 |
| underline | `boolean` | `false` | 是否显示下划线 |
| disabled | `boolean` | `false` | 是否禁用链接 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于显示链接的主要内容 | - |
| icon | 图标插槽，用于显示链接的前置图标 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| click | 点击事件 | (e: MouseEvent) => void |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-link href="#default">默认链接</x-link>
  <x-link href="#primary" type="primary">主要链接</x-link>
  <x-link href="#secondary" type="secondary">次要链接</x-link>
  <x-link href="#success" type="success">成功链接</x-link>
  <x-link href="#warning" type="warning">警告链接</x-link>
  <x-link href="#error" type="error">错误链接</x-link>
  <x-link href="#info" type="info">信息链接</x-link>
</template>
```

:::

### 下划线

:::demo

```vue
<template>
  <x-link href="#" underline>默认链接</x-link>
  <x-link href="#" type="primary" underline>主要链接</x-link>
  <x-link href="#" type="success" underline>成功链接</x-link>
</template>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <x-link href="#" disabled>默认链接</x-link>
  <x-link href="#" type="primary" disabled>主要链接</x-link>
  <x-link href="#" type="success" disabled>成功链接</x-link>
</template>
```

:::

### 带图标

:::demo

```vue
<template>
  <x-link href="#">
    <template #icon>
      <x-icon name="quill:link-out"></x-icon>
    </template>
    外部链接
  </x-link>
  <x-link href="#" type="primary">
    <template #icon>
      <x-icon name="line-md:email"></x-icon>
    </template>
    发送邮件
  </x-link>
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
```
