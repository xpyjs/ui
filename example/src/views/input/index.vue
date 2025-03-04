<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-input v-model="input1" placeholder="请输入内容" />
    </Demo>

    <Demo title="输入框尺寸">
      <x-input v-model="input2" size="small" placeholder="小型输入框" />
      <x-input v-model="input2" placeholder="默认输入框" />
      <x-input v-model="input2" size="large" placeholder="大型输入框" />
    </Demo>

    <Demo title="输入框状态">
      <x-input v-model="input3" disabled placeholder="禁用状态" />
      <x-input v-model="input3" readonly placeholder="只读状态" />
      <x-input v-model="input3" status="success" placeholder="成功状态" />
      <x-input v-model="input3" status="warning" placeholder="警告状态" />
      <x-input v-model="input3" status="error" placeholder="错误状态" />
    </Demo>

    <Demo title="可清除内容">
      <x-input
        v-model="input4"
        clearable
        placeholder="输入内容后显示清除按钮"
      />
    </Demo>

    <Demo title="带图标的输入框">
      <x-input v-model="input5" placeholder="请输入搜索内容">
        <template #prefix>
          <x-icon name="akar-icons:search" />
        </template>
      </x-input>
      <x-input v-model="input5" placeholder="请输入用户名">
        <template #suffix>
          <x-icon name="material-symbols:person" />
        </template>
      </x-input>
    </Demo>

    <Demo title="复合型输入框">
      <x-input v-model="input6" placeholder="请输入内容">
        <template #prepend>Http://</template>
      </x-input>
      <x-input v-model="input6" placeholder="请输入内容">
        <template #append>.com</template>
      </x-input>
      <x-input v-model="input6" placeholder="请输入内容">
        <template #prepend>
          <x-select
            v-model="protocol"
            style="width: 100px; border: none"
            :options="options"
          />
        </template>
        <template #append>.com</template>
      </x-input>
    </Demo>

    <Demo title="不同类型">
      <x-input v-model="input7" type="password" placeholder="请输入密码" />
      <x-input v-model="input7" type="number" placeholder="请输入数字" />
      <x-input v-model="input7" type="tel" placeholder="请输入电话号码" />
      <x-input v-model="input7" type="email" placeholder="请输入邮箱" />
      <x-input v-model="input7" type="url" placeholder="请输入网址" />
    </Demo>

    <Demo title="最大长度">
      <x-input v-model="input8" maxLength="10" placeholder="请输入内容" />
      <p>{{ input8 }}</p>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const input5 = ref("");
const input6 = ref("");
const input7 = ref("");
const input8 = ref("");
const protocol = ref("http");
const options = [
  { label: "Http://", value: "http" },
  { label: "Https://", value: "https" }
];
</script>

<style lang="scss" scoped>
.demo-block {
  .x-input {
    width: 300px;
    margin-right: 16px;
  }
}
</style>
