---
outline: [2, 3]
---

<style>
  .x-input {
    width: 400px;
  }
</style>

# Input 输入框

输入框组件允许用户通过键盘输入内容，是最基础的表单控件，常用于各种表单场景。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 输入值 | `string \| number` | — |
| type | 输入类型 | `'text' \| 'password' \| 'number' \| 'tel' \| 'email' \| 'url'` | `'text'` |
| placeholder | 输入框占位符 | `string` | — |
| size | 输入框大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | 输入框状态 | `'success' \| 'warning' \| 'error'` | — |
| disabled | 输入框是否禁用 | `boolean` | `false` |
| readonly | 输入框是否只读 | `boolean` | `false` |
| clearable | 输入框是否可清除 | `boolean` | `false` |
| maxLength | 输入框最大长度 | `number \| string` | — |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 在输入值变化时触发 | `(value: string \| number) => void` |
| change | 仅在输入框失去焦点或用户按下回车时触发 | `(value: string \| number, evt: Event) => void` |
| input | 在输入值变化时触发 | `(value: string \| number, evt: Event) => void` |
| focus | 在输入框获得焦点时触发 | `(evt: FocusEvent) => void` |
| blur | 在输入框失去焦点时触发 | `(evt: FocusEvent) => void` |
| clear | 在点击清除按钮时触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 前缀图标 |
| suffix | 后缀图标 |
| prepend | 前置内容 |
| append | 后置内容 |
| clearIcon | 清除按钮图标 |

## 基础用法

基础的输入框用法，通过v-model进行双向绑定。

:::demo

```vue
<template>
  <x-input v-model="input" placeholder="请输入内容"></x-input>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>
```

:::

## 输入框尺寸

提供三种尺寸的输入框，通过`size`属性控制。

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input v-model="input" size="small" placeholder="小型输入框"></x-input>
    <x-input v-model="input" placeholder="默认尺寸"></x-input>
    <x-input v-model="input" size="large" placeholder="大型输入框"></x-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>

<style>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
</style>
```

:::

## 输入框状态

输入框可以有不同的状态，包括禁用、只读以及成功、警告、错误状态。

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input v-model="input" disabled placeholder="禁用状态"></x-input>
    <x-input v-model="input" readonly placeholder="只读状态"></x-input>
    <x-input v-model="input" status="success" placeholder="成功状态"></x-input>
    <x-input v-model="input" status="warning" placeholder="警告状态"></x-input>
    <x-input v-model="input" status="error" placeholder="错误状态"></x-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>
```

:::

## 可清除输入框

设置`clearable`属性可以使输入框在有内容时显示清除按钮。

:::demo

```vue
<template>
  <x-input v-model="input" clearable placeholder="输入内容后显示清除按钮"></x-input>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('这是可清空的输入框');
</script>
```

:::

## 带图标的输入框

可以通过插槽添加前缀图标或后缀图标。

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input v-model="input1" placeholder="请输入搜索内容">
      <template #prefix>
        <x-icon name="akar-icons:search" />
      </template>
    </x-input>
    <x-input v-model="input2" placeholder="请输入用户名">
      <template #suffix>
        <x-icon name="material-symbols:person" />
      </template>
    </x-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
</script>
```

:::

## 复合型输入框

可以在输入框前后添加其他内容。

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input v-model="input1" placeholder="请输入内容">
      <template #prepend>Http://</template>
    </x-input>

    <x-input v-model="input2" placeholder="请输入内容">
      <template #append>.com</template>
    </x-input>

    <x-input v-model="input3" placeholder="请输入内容">
      <template #prepend>
        <x-select v-model="protocol" class="protocol-selector" :items="items" />
      </template>
      <template #append>.com</template>
    </x-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const protocol = ref('http');
const items = [
  { label: "Http://", value: "http" },
  { label: "Https://", value: "https" }
];
</script>

<style>
.protocol-selector {
  width: 100px;
  border: none;
}

.protocol-selector .x-input__wrapper {
  border: none;
  height: 100%;
}
</style>
```

:::

## 不同类型的输入框

通过`type`属性可以使用不同类型的输入框。

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input v-model="input" type="text" placeholder="普通文本"></x-input>
    <x-input v-model="input" type="password" placeholder="请输入密码"></x-input>
    <x-input v-model="input" type="number" placeholder="请输入数字"></x-input>
    <x-input v-model="input" type="tel" placeholder="请输入电话号码"></x-input>
    <x-input v-model="input" type="email" placeholder="请输入邮箱"></x-input>
    <x-input v-model="input" type="url" placeholder="请输入网址"></x-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>
```

:::

## 限制输入长度

使用`maxLength`属性可以限制输入框的最大输入长度。

:::demo

```vue
<template>
  <x-input v-model="input" maxLength="10" placeholder="最多输入10个字符"></x-input>
  <p>当前输入: {{ input }}</p>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>
```

:::

## TypeScript

```ts
import type { ComponentSize, ComponentType } from '../types/basic';

export interface InputProps {
  modelValue?: string | number;
  type?: "text" | "password" | "number" | "tel" | "email" | "url";
  placeholder?: string;
  size?: ComponentSize; // "small" | "medium" | "large"
  status?: Extract<ComponentType, "success" | "warning" | "error">;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  maxLength?: number | string;
}
```
