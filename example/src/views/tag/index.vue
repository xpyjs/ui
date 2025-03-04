<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-tag>默认标签</x-tag>
      <x-tag type="primary">主要标签</x-tag>
      <x-tag type="success">成功标签</x-tag>
      <x-tag type="warning">警告标签</x-tag>
      <x-tag type="error">错误标签</x-tag>
      <x-tag type="info">信息标签</x-tag>
    </Demo>

    <Demo title="不同变体">
      <x-tag type="primary">填充样式</x-tag>
      <x-tag type="primary" variant="outlined">描边样式</x-tag>
      <x-tag type="success">填充样式</x-tag>
      <x-tag type="success" variant="outlined">描边样式</x-tag>
    </Demo>

    <Demo title="不同尺寸">
      <x-tag size="small">小号标签</x-tag>
      <x-tag size="medium">中号标签</x-tag>
      <x-tag size="large">大号标签</x-tag>
    </Demo>

    <Demo title="可关闭标签">
      <x-tag
        v-for="tag in tags"
        :key="tag"
        closable
        :close-show-type="tag === '常驻显示' ? 'always' : 'hover'"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </x-tag>
    </Demo>

    <Demo title="自定义关闭按钮">
      <x-tag closable close-show-type="always">
        默认关闭图标
        <template #close>
          <x-icon name="ion:close-circle" />
        </template>
      </x-tag>

      <x-tag type="error" closable close-show-type="hover">
        <template #close>
          <x-icon name="ion:trash" />
        </template>
        自定义删除图标
      </x-tag>
    </Demo>

    <Demo title="组合使用">
      <x-tag type="primary" variant="outlined" size="large" closable>
        大型描边标签
      </x-tag>
      <x-tag type="success" size="small" closable close-show-type="always">
        小型常驻关闭
      </x-tag>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const tags = ref(["常驻显示", "悬停显示", "标签三"]);

const handleClose = (tag: string) => {
  tags.value = tags.value.filter(t => t !== tag);
};
</script>
