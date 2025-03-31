---
outline: [2, 3]
---

<style>
  .demo-container-box {
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Fixed 固定

用于将内容固定在页面的特定位置，支持拖拽。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `true` | 是否显示 |
| target | `string \| HTMLElement` | `'body'` | 挂载的目标元素 |
| position | `{ top?: number \| string; right?: number \| string; bottom?: number \| string; left?: number \| string }` | `{ right: '40px', bottom: '40px' }` | 初始位置 |
| draggable | `boolean` | `false` | 是否可拖拽 |
| zIndex | `number` | `6000` | z-index |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于显示固定内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| dragging | 拖拽开始事件 | `(val: boolean) => void` |
| change | 位置改变事件 | `(position: { top: number; left: number }) => void` |

## 示例

### 基础用法

基本的固定元素，默认显示在右下角。

:::demo

```vue
<template>
  <div>右下角按钮</div>

  <x-fixed :position="{ right: '20px', bottom: '20px' }">
    <x-button type="primary" shape="circle" size="large" @click="handleClick">
      <template #icon>
        <x-icon name="mdi:arrow-up" />
      </template>
    </x-button>
  </x-fixed>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log("click");
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};
</script>
```

:::

### 自定义位置

你可以通过 position 属性设置固定元素的位置。

:::demo

```vue
<template>
  <div>左下角 { left: '40px', bottom: '40px' }</div>

  <x-fixed :position="{ left: '40px', bottom: '40px' }">
    <x-icon name="mdi:message" />
  </x-fixed>
</template>
```

:::

### 使用拖拽

通过 draggable 属性可以使固定元素支持拖拽。

:::demo

```vue
<template>
  <div>禁用拖拽 { right: '120px', bottom: '40px' }</div>

  <x-fixed :draggable="true" :position="{ right: '120px', bottom: '40px' }">
    <x-button type="success">
      拖拽我
      <template #icon>
        <x-icon name="mdi:heart" />
      </template>
    </x-button>
  </x-fixed>
</template>
```

:::

### 指定挂载目标

通过 target 属性可以将固定元素挂载到指定的 DOM 元素上，并限制在该元素内拖拽。

:::demo

```vue
<template>
  <div ref="containerRef" class="demo-container-box">
    <p>这是一个容器,浮动按钮只能在这个容器内移动</p>
    <x-fixed
      :target="containerRef"
      :draggable="true"
      :position="{ right: '20px', bottom: '20px' }"
    >
      <x-icon name="mdi:plus" />
    </x-fixed>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const containerRef = ref<HTMLElement>();
</script>

<style scoped>
.demo-container-box {
  position: relative;
  height: 200px;
  padding: 20px;
  border: 1px solid var(--x-border-color);
  border-radius: var(--x-border-radius-base);
  background: var(--x-bg-color);
}
</style>
```

:::

### 显示/隐藏

通过 visible 属性控制固定元素的显示和隐藏。

:::demo

```vue
<template>
  <x-button @click="visible = !visible">
    {{ visible ? "隐藏" : "显示" }}
  </x-button>

  <x-fixed
    v-model:visible="visible"
    :position="{ right: '200px', bottom: '400px' }"
  >
    <x-button type="secondary" shape="round">
      消失的我
      <template #icon>
        <x-icon name="mdi:star" />
      </template>
    </x-button>
  </x-fixed>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(true);
</script>
```

:::

### 回到顶部示例

结合容器滚动实现回到顶部的示例。

:::demo

```vue
<template>
  <div>
    <div>容器内，滚动超过100px时，显示回到顶部按钮</div>

    <div class="demo-scroll-container" ref="containerRef">
      <div class="demo-scroll-content" ref="scrollRef" @scroll="handleScroll">
        <p v-for="i in 50" :key="i">这是第 {{ i }} 行内容</p>
      </div>

      <x-fixed
        :target="containerRef"
        :visible="showBackTop"
        :position="{ right: '20px', bottom: '20px' }"
        :draggable="true"
        @dragging="handleDragging"
      >
        <x-button type="primary" shape="circle" @click="handleBackTop">
          <template #icon>
            <x-icon name="mdi:arrow-up" />
          </template>
        </x-button>
      </x-fixed>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const containerRef = ref<HTMLElement>();
const scrollRef = ref<HTMLElement>();
const showBackTop = ref(false);

const handleScroll = () => {
  if (!scrollRef.value) return;
  showBackTop.value = scrollRef.value.scrollTop > 100;
};

const isDragging = ref(false);
const handleDragging = (val: boolean) => {
  isDragging.value = val;
};

const handleBackTop = () => {
  if (isDragging.value) return;
  scrollRef.value?.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
</script>

<style scoped>
.demo-scroll-container {
  height: 300px;
  width: 600px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--x-border-color);
  border-radius: var(--x-border-radius-base);
  margin-top: 12px;

  .demo-scroll-content {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
```

:::
