---
outline: [2, 3]
---

# Icon 图标

提供各种图标显示的组件，支持 iconify 图标库和自定义 SVG 内容。

## 使用指南

### Iconify 图标

Icon 组件默认支持 [Iconify](https://iconify.design/) 图标库，这是一个包含超过 150,000 个开源图标的集合。您可以在 [Iconify Icon Sets](https://icon-sets.iconify.design/) 浏览并查找所需的图标。图标名称格式为 `{集合名称}:{图标名}`，例如 `mdi:home`、`fa:user` 等。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| name | `string` | `''` | 图标名称，支持 iconify。也支持以 `url:` 前缀传递地址 |
| content | `string` | `''` | 一段 svg 图标文本内容。优先级比 name 高，会覆盖 name |
| color | `string` | `'currentColor'` | 图标颜色 |
| size | `string \| number` | `'1em'` | 图标大小 |

## 示例

### 基础用法

:::demo

```vue
<template>
  <div class="container">
    <x-icon name="icon-park-outline:handle-a" />
    <x-icon name="icon-park-outline:handle-b" />
    <x-icon name="icon-park-outline:handle-c" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 16px;
}
</style>
```

:::

### 本地图标

:::demo

```vue
<template>
  <div class="container">
    <x-icon :name="`url:${addIcon2}`" size="16" />
    <x-icon :content="addIcon" size="40" />
    <x-icon :content="localIcon" size="20" />
  </div>
</template>

<script setup lang="ts">
import addIcon from "./icons/add.svg?raw";
import addIcon2 from "./icons/add.svg";

const localIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"></path></svg>`;
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
```

:::

### 自定义颜色

:::demo

```vue
<template>
  <div class="container">
    <x-icon name="icon-park-outline:handle-a" color="#f00" />
    <x-icon name="icon-park-outline:handle-b" color="#0f0" />
    <x-icon name="icon-park-outline:handle-c" color="#00f" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 16px;
}
</style>
```

:::

### 自定义大小

:::demo

```vue
<template>
  <div class="container" style="align-items: center;">
    <x-icon name="icon-park-outline:handle-a" color="#f00" size="24" />
    <x-icon name="icon-park-outline:handle-b" color="#0f0" size="32" />
    <x-icon name="icon-park-outline:handle-c" color="#00f" size="40" />
    <x-icon :content="localIcon" size="24px" />
    <x-icon :content="localIcon" size="1em" />
    <x-icon :content="localIcon" size="4rem" />
  </div>
</template>

<script setup lang="ts">
const localIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"></path></svg>`;
</script>

<style scoped>
.container {
  display: flex;
  gap: 16px;
}
</style>
```

:::
