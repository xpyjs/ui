<template>
  <div class="demo-container">
    <Demo title="基础用法">
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
    </Demo>

    <Demo title="带图标">
      <x-breadcrumb
        :items="[
          { label: '首页', to: '/', icon: 'mdi:home' },
          { label: '列表页', to: '/list', icon: 'mdi:format-list-bulleted' },
          { label: '详情页', icon: 'mdi:file-document-outline' }
        ]"
      />
    </Demo>

    <Demo title="自定义分隔符">
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
    </Demo>

    <Demo title="使用图标分隔符">
      <x-breadcrumb
        separator-icon="mdi:chevron-right"
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', to: '/list' },
          { label: '详情页' }
        ]"
      />
    </Demo>

    <Demo title="自定义点击事件">
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
    </Demo>

    <Demo title="禁用状态">
      <x-breadcrumb
        :items="[
          { label: '首页', to: '/' },
          { label: '列表页', disabled: true },
          { label: '详情页' }
        ]"
      />
    </Demo>

    <Demo title="自定义样式">
      <x-breadcrumb
        :items="[
          { label: '首页', to: '/', class: 'custom-item' },
          { label: '列表页', to: '/list', class: 'custom-item' },
          { label: '详情页', class: 'custom-item' }
        ]"
      />
    </Demo>

    <Demo title="不同类型">
      <div>
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
      </div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";

function onClick(test: string) {
  alert(test);
}
</script>

<style scoped>
.custom-item {
  color: red;
  font-weight: bold;
}

.custom-item:hover {
  color: #fa2d2d;
}
</style>
