# 安装

## 安装依赖

有了前面的基础，我们可以快速开始：

::: code-group

```sh [npm]
npm install @xpyjs/x-ui
```

```sh [yarn]
yarn add @xpyjs/x-ui
```

```sh [pnpm]
pnpm add @xpyjs/x-ui
```

:::

## 快速开始

### 全局引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import XUI from '@xpyjs/x-ui'
import '@xpyjs/x-ui/index.css'

createApp(App).use(XUI).mount('#app')
```

### 按需引入

```vue
<template>
  <x-button>按钮</x-button>
</template>

<script setup>
import { XButton } from '@xpyjs/x-ui'
```
