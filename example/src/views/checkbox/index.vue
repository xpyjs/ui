<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <div class="demo-row">
        <x-checkbox v-model="checked1">选项1</x-checkbox>
      </div>
    </Demo>

    <Demo title="不同形状">
      <div class="demo-row">
        <x-checkbox v-model="checked1">默认</x-checkbox>
        <x-checkbox v-model="checked1" shape="dot">dot</x-checkbox>
      </div>
    </Demo>

    <Demo title="不同尺寸">
      <div class="demo-row">
        <x-checkbox v-model="checked3" size="small">小型</x-checkbox>
        <x-checkbox v-model="checked3" size="medium">中等</x-checkbox>
        <x-checkbox v-model="checked3" size="large">大型</x-checkbox>
      </div>
    </Demo>

    <Demo title="不同类型">
      <div class="demo-row">
        <x-checkbox v-model="checked4" type="default">默认</x-checkbox>
        <x-checkbox v-model="checked4" type="primary">主要</x-checkbox>
        <x-checkbox v-model="checked4" type="success">成功</x-checkbox>
        <x-checkbox v-model="checked4" type="warning">警告</x-checkbox>
        <x-checkbox v-model="checked4" type="error">错误</x-checkbox>
      </div>
    </Demo>

    <Demo title="禁用状态">
      <div class="demo-row">
        <x-checkbox v-model="checked5" disabled>禁用未选中</x-checkbox>
        <x-checkbox v-model="checked6" disabled>禁用已选中</x-checkbox>
      </div>
    </Demo>

    <Demo title="复选框组">
      <div class="demo-desc">水平布局</div>
      <div class="demo-row">
        <x-checkbox-group
          v-model="groupValue1"
          direction="horizontal"
          :gap="16"
        >
          <x-checkbox value="1">选项1</x-checkbox>
          <x-checkbox value="2">选项2</x-checkbox>
          <x-checkbox value="3">选项3</x-checkbox>
        </x-checkbox-group>
      </div>

      <div class="demo-desc">垂直布局</div>
      <div class="demo-row">
        <x-checkbox-group v-model="groupValue2" direction="vertical">
          <x-checkbox value="1">选项1</x-checkbox>
          <x-checkbox value="2">选项2</x-checkbox>
          <x-checkbox value="3">选项3</x-checkbox>
        </x-checkbox-group>
      </div>
    </Demo>

    <Demo title="组尺寸">
      <div class="demo-row">
        <x-checkbox-group v-model="groupValue3" size="small">
          <x-checkbox value="1">小型</x-checkbox>
          <x-checkbox value="2">选项</x-checkbox>
          <x-checkbox value="3">按钮</x-checkbox>
        </x-checkbox-group>
      </div>

      <div class="demo-row">
        <x-checkbox-group v-model="groupValue3" size="medium">
          <x-checkbox value="1">小型</x-checkbox>
          <x-checkbox value="2">选项</x-checkbox>
          <x-checkbox value="3">按钮</x-checkbox>
        </x-checkbox-group>
      </div>

      <div class="demo-row">
        <x-checkbox-group v-model="groupValue3" size="large">
          <x-checkbox value="1">小型</x-checkbox>
          <x-checkbox value="2">选项</x-checkbox>
          <x-checkbox value="3">按钮</x-checkbox>
        </x-checkbox-group>
      </div>
    </Demo>

    <Demo title="组类型">
      <div class="demo-row">
        <x-checkbox-group v-model="groupValue4" type="primary">
          <x-checkbox value="1">主要</x-checkbox>
          <x-checkbox value="2">选项</x-checkbox>
          <x-checkbox value="3">按钮</x-checkbox>
        </x-checkbox-group>
      </div>
    </Demo>

    <Demo title="组禁用">
      <div class="demo-row">
        <x-checkbox-group v-model="groupValue5" disabled>
          <x-checkbox value="1">禁用</x-checkbox>
          <x-checkbox value="2">状态</x-checkbox>
          <x-checkbox value="3">按钮</x-checkbox>
        </x-checkbox-group>
      </div>
    </Demo>

    <Demo title="不确定状态">
      <div class="demo-row">
        <x-checkbox v-model="checked2" :indeterminate="true"
          >不确定状态</x-checkbox
        >
      </div>

      <p class="demo-desc">
        很多时候，需要全选功能，这时候可以设置 indeterminate 属性。使用
        <code>x-checkbox-group</code> 的
        <code>all</code> 属性来控制全选状态，会时分便捷。
      </p>
      <div class="demo-row">
        <x-checkbox v-model="allChecked1" :indeterminate="allChecked1 === null">
          全选
        </x-checkbox>
      </div>
      <div class="demo-row">
        <x-checkbox-group v-model="groupValue6" v-model:all="allChecked1">
          <x-checkbox value="1">选项1</x-checkbox>
          <x-checkbox value="2">选项2</x-checkbox>
          <x-checkbox value="3">选项3</x-checkbox>
        </x-checkbox-group>
      </div>

      <div class="demo-desc">带类型的全选</div>
      <div class="demo-row">
        <x-checkbox
          v-model="allChecked2"
          :indeterminate="allChecked2 === null"
          type="primary"
        >
          全选
        </x-checkbox>
      </div>
      <div class="demo-row">
        <x-checkbox-group v-model="groupValue7" v-model:all="allChecked2">
          <x-checkbox value="1" type="primary">选项1</x-checkbox>
          <x-checkbox value="2" type="success">选项2</x-checkbox>
          <x-checkbox value="3" type="warning">选项3</x-checkbox>
        </x-checkbox-group>
      </div>
    </Demo>

    <Demo title="自定义内容">
      <div class="demo-row">
        <x-checkbox v-model="customChecked1">
          <template #box="{ checked, indeterminate, disabled }">
            <div class="custom-checkbox">
              <x-icon v-if="checked" name="lets-icons:check-fill" />
              <x-icon
                v-else-if="indeterminate"
                name="mdi:radiobox-indeterminate-variant"
              />
              <x-icon v-else name="ph:empty-bold" />
            </div>
          </template>
          自定义图标
        </x-checkbox>
      </div>

      <div class="demo-row">
        <x-checkbox v-model="customChecked1">
          <template #box="{ checked, indeterminate, disabled }">
            <div class="custom-checkbox2">
              <x-icon v-if="checked" name="lets-icons:check-fill" size="40" />
              <x-icon
                v-else-if="indeterminate"
                name="mdi:radiobox-indeterminate-variant"
              />
              <x-icon v-else name="ph:empty-bold" size="40" />
            </div>
          </template>
          自定义图标大小
        </x-checkbox>
      </div>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(false);
const checked4 = ref(true);
const checked5 = ref(false);
const checked6 = ref(true);

const groupValue1 = ref(["1"]);
const groupValue2 = ref(["1"]);
const groupValue3 = ref(["1"]);
const groupValue4 = ref(["1"]);
const groupValue5 = ref(["1"]);

const groupValue6 = ref<string[]>(["2"]);
const allChecked1 = ref<boolean | null>(false);

const groupValue7 = ref<string[]>(["1"]);
const allChecked2 = ref<boolean | null>(null);

const customChecked1 = ref(false);
</script>

<style lang="scss" scoped>
.demo-row {
  width: 100%;

  & > * {
    margin-right: 16px;
  }
}

.demo-desc {
  margin: 16px 0 8px;
  color: var(--x-text-color-secondary);
  font-size: 14px;

  &:first-child {
    margin-top: 0;
  }
}

.custom-checkbox {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-checkbox2 {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
