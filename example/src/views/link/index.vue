<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-link href="#default">默认链接</x-link>
      <x-link href="#primary" type="primary">主要链接</x-link>
      <x-link href="#secondary" type="secondary">次要链接</x-link>
      <x-link href="#success" type="success">成功链接</x-link>
      <x-link href="#warning" type="warning">警告链接</x-link>
      <x-link href="#error" type="error">错误链接</x-link>
      <x-link href="#info" type="info">信息链接</x-link>
    </Demo>

    <Demo title="下划线">
      <x-link href="#" underline>默认链接</x-link>
      <x-link href="#" type="primary" underline>主要链接</x-link>
      <x-link href="#" type="success" underline>成功链接</x-link>
    </Demo>

    <Demo title="禁用状态">
      <x-link href="#" disabled>默认链接</x-link>
      <x-link href="#" type="primary" disabled>主要链接</x-link>
      <x-link href="#" type="success" disabled>成功链接</x-link>
    </Demo>

    <Demo title="带图标">
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
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
</script>

<style lang="scss" scoped></style>
