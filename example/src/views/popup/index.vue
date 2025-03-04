<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-popup>
        <x-button>打开弹窗</x-button>
        <template #content>
          <div class="popup-content">这是一个基础弹窗</div>
        </template>
      </x-popup>
    </Demo>

    <Demo title="不同触发方式">
      <x-popup trigger="click">
        <x-button>点击触发</x-button>
        <template #content>
          <div class="popup-content">点击触发的弹窗</div>
        </template>
      </x-popup>

      <x-popup trigger="hover">
        <x-button>悬停触发</x-button>
        <template #content>
          <div class="popup-content">悬停触发的弹窗</div>
        </template>
      </x-popup>

      <x-popup trigger="contextmenu">
        <x-button>右键触发</x-button>
        <template #content>
          <div class="popup-content">右键触发的弹窗</div>
        </template>
      </x-popup>

      <x-popup trigger="manual" v-model:visible="visible2">
        <template #content>
          <div class="popup-content">手动触发的弹窗</div>
        </template>
        <x-button @click="visible2 = !visible2">手动触发</x-button>
      </x-popup>

      <x-popup :reference="trigger2Ref">
        <template #content>
          <div class="popup-content">指定区域的弹窗</div>
        </template>
        <x-button>指定区域</x-button>
      </x-popup>

      <div ref="trigger2Ref">弹出框区域</div>
    </Demo>

    <Demo title="挂载节点">
      <x-popup append-to="body">
        <x-button>挂载到 body</x-button>
        <template #content>
          <div class="popup-content">这是一个基础弹窗</div>
        </template>
      </x-popup>

      <x-popup :append-to="null">
        <x-button>挂载本地</x-button>
        <template #content>
          <div class="popup-content">这是一个基础弹窗</div>
        </template>
      </x-popup>
    </Demo>

    <Demo title="不同位置">
      <div class="placement-demo">
        <div class="top">
          <x-popup placement="top-start">
            <x-button>上左</x-button>
            <template #content>
              <div class="popup-content">top-start</div>
            </template>
          </x-popup>

          <x-popup placement="top">
            <x-button>上中</x-button>
            <template #content>
              <div class="popup-content">top</div>
            </template>
          </x-popup>

          <x-popup placement="top-end">
            <x-button>上右</x-button>
            <template #content>
              <div class="popup-content">top-end</div>
            </template>
          </x-popup>
        </div>

        <div class="left-right">
          <div class="left">
            <x-popup placement="left-start">
              <x-button>左上</x-button>
              <template #content>
                <div class="popup-content">left-start</div>
              </template>
            </x-popup>

            <x-popup placement="left">
              <x-button>左中</x-button>
              <template #content>
                <div class="popup-content">left</div>
              </template>
            </x-popup>

            <x-popup placement="left-end">
              <x-button>左下</x-button>
              <template #content>
                <div class="popup-content">left-end</div>
              </template>
            </x-popup>
          </div>

          <div class="right">
            <x-popup placement="right-start">
              <x-button>右上</x-button>
              <template #content>
                <div class="popup-content">right-start</div>
              </template>
            </x-popup>

            <x-popup placement="right">
              <x-button>右中</x-button>
              <template #content>
                <div class="popup-content">right</div>
              </template>
            </x-popup>

            <x-popup placement="right-end">
              <x-button>右下</x-button>
              <template #content>
                <div class="popup-content">right-end</div>
              </template>
            </x-popup>
          </div>
        </div>

        <div class="bottom">
          <x-popup placement="bottom-start">
            <x-button>下左</x-button>
            <template #content>
              <div class="popup-content">bottom-start</div>
            </template>
          </x-popup>

          <x-popup placement="bottom">
            <x-button>下中</x-button>
            <template #content>
              <div class="popup-content">bottom</div>
            </template>
          </x-popup>

          <x-popup placement="bottom-end">
            <x-button>下右</x-button>
            <template #content>
              <div class="popup-content">bottom-end</div>
            </template>
          </x-popup>
        </div>
      </div>
    </Demo>

    <Demo title="过渡动画">
      <x-popup transition-name="fade">
        <x-button>淡入淡出</x-button>
        <template #content>
          <div class="popup-content">fade 动画</div>
        </template>
      </x-popup>

      <x-popup transition-name="zoom">
        <x-button>缩放</x-button>
        <template #content>
          <div class="popup-content">zoom 动画</div>
        </template>
      </x-popup>

      <x-popup transition-name="slide-up">
        <x-button>滑动</x-button>
        <template #content>
          <div class="popup-content">slide-up 动画</div>
        </template>
      </x-popup>

      <x-popup :transition-name="false">
        <x-button>禁用过度</x-button>
        <template #content>
          <div class="popup-content">没有动画</div>
        </template>
      </x-popup>
    </Demo>

    <Demo title="事件">
      <x-popup
        @show="handleShow"
        @shown="handleShown"
        @hide="handleHide"
        @hidden="handleHidden"
      >
        <x-button>事件</x-button>
        <template #content>
          <div class="popup-content">触发动画事件</div>
        </template>
      </x-popup>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

const visible = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);

const trigger2Ref = ref<HTMLElement>();

const handleShow = () => {
  console.log("show");
};

const handleShown = () => {
  console.log("shown");
};

const handleHide = () => {
  console.log("hide");
};

const handleHidden = () => {
  console.log("hidden");
};
</script>

<style lang="scss" scoped>
.popup-content {
  padding: 16px;
}

.placement-demo {
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  padding: 100px;

  .top,
  .bottom {
    display: flex;
    gap: 80px;
  }

  .left-right {
    display: flex;
    justify-content: space-between;
    width: 400px;

    .left,
    .right {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>
