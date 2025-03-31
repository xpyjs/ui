---
outline: [2, 3]
---

<style>
  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Message 消息提示

Message 组件用于展示轻量级的提示信息，可以自动关闭，支持不同类型和位置的消息展示。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否可见 |
| content | `string` | - | 消息内容 |
| type | `MessageType` | `info` | 消息类型 |
| top | `VerticalAlign \| string \| number` | `center` | 显示位置 |
| duration | `number` | `3000` | 显示时长(ms), 0 表示不自动关闭 |
| closable | `boolean` | `true` | 是否可关闭 |
| enterable | `boolean` | `true` | 鼠标移入是否暂停关闭 |
| transitionName | `TransitionName \| false` | `x-slide-down` | 过渡动画名称，`false` 表示不使用动画 |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:visible | 可见状态变化时触发 | `(visible: boolean) => void` |
| close | 关闭后触发 | - |

## 全局方法

除了组件方式使用外，X-UI 还提供了全局方法 `$message` 和 `useMessage` 钩子来使用 Message 组件。

### 命令式创建

```ts
// 使用方法
this.$message(options);

// 或者直接传入字符串
this.$message('这是一条消息提示');
```

### Hooks 方式

```ts
import { useMessage } from '@xpyjs/x-ui';

// 在 setup 中使用
const { message } = useMessage();
message(options);

// 或者直接传入字符串
message('这是一条消息提示');
```

## 示例

### 基础用法

使用 `v-model:visible` 来控制消息提示的显示和隐藏。

:::demo

```vue
<template>
  <x-button @click="() => (visible = true)">显示消息</x-button>
  <x-message v-model:visible="visible" content="这是一条基础消息提示" />

  <x-button @click="showBasic">命令式调用</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

const visible = ref(false);
const { proxy } = getCurrentInstance()!;

// 基础用法
const showBasic = () => {
  proxy?.$message("这是一条基础消息提示");
};
</script>
```

:::

### 不同类型

Message 组件提供了多种类型，包括默认、信息、成功、警告和错误。

:::demo

```vue
<template>
  <x-button type="default" @click="showDefault">默认消息</x-button>
  <x-button type="info" @click="showInfo">信息消息</x-button>
  <x-button type="success" @click="showSuccess">成功消息</x-button>
  <x-button type="warning" @click="showWarning">警告消息</x-button>
  <x-button type="error" @click="showError">错误消息</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 不同类型
const showDefault = () => {
  proxy?.$message({
    type: "default",
    content: "这是一条默认消息"
  });
};

const showInfo = () => {
  proxy?.$message({
    type: "info",
    content: "这是一条信息消息"
  });
};

const showSuccess = () => {
  proxy?.$message({
    type: "success",
    content: "这是一条成功消息"
  });
};

const showWarning = () => {
  proxy?.$message({
    type: "warning",
    content: "这是一条警告消息"
  });
};

const showError = () => {
  proxy?.$message({
    type: "error",
    content: "这是一条错误消息"
  });
};
</script>
```

:::

### 不同位置

可以通过 `top` 属性指定消息提示的显示位置。

:::demo

```vue
<template>
  <x-button @click="showTop">顶部显示</x-button>
  <x-button @click="showCenter">居中显示</x-button>
  <x-button @click="showBottom">底部显示</x-button>
  <x-button @click="showCustom">自定义位置</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 不同位置
const showTop = () => {
  proxy?.$message({
    content: "顶部显示的消息",
    top: "top"
  });
};

const showCenter = () => {
  proxy?.$message({
    content: "居中显示的消息",
    top: "center"
  });
};

const showBottom = () => {
  proxy?.$message({
    content: "底部显示的消息",
    top: "bottom"
  });
};

const showCustom = () => {
  proxy?.$message({
    content: "自定义位置的消息",
    top: "30vh"
  });
};
</script>
```

:::

### 手动关闭

可以通过 `closable` 属性控制消息是否可以手动关闭。

:::demo

```vue
<template>
  <x-button @click="showClosable">可关闭消息</x-button>
  <x-button @click="showNoClosable">不可关闭消息</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 手动关闭
const showClosable = () => {
  proxy?.$message({
    content: "点击关闭按钮可以关闭消息",
    closable: true
  });
};

const showNoClosable = () => {
  proxy?.$message({
    content: "这条消息不能手动关闭",
    closable: false
  });
};
</script>
```

:::

### 自定义时长

可以通过 `duration` 属性自定义消息显示的时长，设置为 0 则不会自动关闭。

:::demo

```vue
<template>
  <x-button @click="showDuration">显示 10 秒</x-button>
  <x-button @click="showNoDuration">不自动关闭</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 自定义时长
const showDuration = () => {
  proxy?.$message({
    content: "这条消息将显示 10 秒",
    duration: 10000
  });
};

const showNoDuration = () => {
  proxy?.$message({
    content: "这条消息不会自动关闭",
    duration: 0
  });
};
</script>
```

:::

### 多行文本

Message 组件支持显示多行文本内容。

:::demo

```vue
<template>
  <x-button @click="showMultiline">多行文本</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 多行文本
const showMultiline = () => {
  proxy?.$message({
    content: `这是一条多行消息提示
第二行内容
第三行内容`
  });
};
</script>
```

:::

### 不同动画

通过 `transitionName` 属性可以设置不同的过渡动画。

:::demo

```vue
<template>
  <x-button @click="showFade">淡入淡出</x-button>
  <x-button @click="showZoom">缩放</x-button>
  <x-button @click="showSlide">滑动</x-button>
  <x-button @click="noTransition">无动画</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 不同动画
const showFade = () => {
  proxy?.$message({
    content: "淡入淡出动画",
    transitionName: "x-fade"
  });
};

const showZoom = () => {
  proxy?.$message({
    content: "缩放动画",
    transitionName: "x-zoom"
  });
};

const showSlide = () => {
  proxy?.$message({
    content: "滑动动画",
    transitionName: "x-slide-down"
  });
};

const noTransition = () => {
  proxy?.$message({
    content: "无动画效果",
    transitionName: false
  });
};
</script>
```

:::

## TypeScript

```ts
// 消息类型
type MessageType = 'default' | 'info' | 'success' | 'warning' | 'error';

// 垂直位置
type VerticalAlign = 'top' | 'center' | 'bottom';

// 动画名称
type TransitionName =
  | 'x-fade'
  | 'x-zoom'
  | 'x-slide'
  | 'x-slide-up'
  | 'x-slide-down'
  | 'x-slide-left'
  | 'x-slide-right';

// 全局方法选项
export interface MessageOptions
  extends Partial<Omit<MessageProps, 'visible'>> {
}
```
