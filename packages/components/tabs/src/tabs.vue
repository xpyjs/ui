<template>
  <div
    :class="[
      'x-tabs',
      `x-tabs--${type}`,
      `x-tabs--${direction}`,
      {
        'x-tabs--addable': addable,
        'x-tabs--closable': closable
      }
    ]"
  >
    <!-- 标签页导航 -->
    <div class="x-tabs__nav" ref="navRef">
      <div class="x-tabs__nav-wrap" ref="navWrapRef">
        <div class="x-tabs__nav-scroll" ref="navScrollRef">
          <!-- 标签页列表 -->
          <div class="x-tabs__nav-list" ref="navListRef">
            <tab-nav-item
              v-for="item in items"
              :key="item.id"
              :item="item"
              :active="item.id === modelValue"
              :closable="(closable || item.closable) && items.length > 1"
              @click="handleTabClick(item)"
              @close="handleTabClose(item)"
            />
            <!-- 新增按钮 -->
            <div v-if="addable" class="x-tabs__add" @click="emit('add')">
              <x-icon name="mdi:plus" />
            </div>
          </div>
          <!-- 指示器 -->
          <div
            ref="indicatorRef"
            class="x-tabs__indicator"
            :style="indicatorStyle"
          />
        </div>
      </div>
      <!-- 滚动按钮 -->
      <div v-if="showPrev" class="x-tabs__nav-prev" @click="handlePrevClick">
        <x-icon
          :name="
            direction === 'horizontal' ? 'mdi:chevron-left' : 'mdi:chevron-up'
          "
        />
      </div>
      <div v-if="showNext" class="x-tabs__nav-next" @click="handleNextClick">
        <x-icon
          :name="
            direction === 'horizontal'
              ? 'mdi:chevron-right'
              : 'mdi:chevron-down'
          "
        />
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="x-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick, watchEffect } from "vue";
import { type TabsProps, tabsEmits, type TabItem } from "./props";
import TabNavItem from "./tab-nav-item.vue";
import { XIcon } from "@/components/icon";
import { useEventListener } from "@/hooks/useEvent";

defineOptions({
  name: "XTabs"
});

const props = withDefaults(defineProps<TabsProps>(), {
  type: "line",
  direction: "horizontal",
  items: () => []
});
const emit = defineEmits(tabsEmits);

// refs
const navRef = ref<HTMLElement>();
const navWrapRef = ref<HTMLElement>();
const navScrollRef = ref<HTMLElement>();
const navListRef = ref<HTMLElement>();
const indicatorRef = ref<HTMLElement>();

// 滚动相关
const scrollable = ref(false);
const showPrev = ref(false);
const showNext = ref(false);
const currentOffset = ref(0);

// 计算当前激活的标签页元素
const activeTab = ref<HTMLElement | null>();
const updateActiveTab = () => {
  activeTab.value = navListRef.value?.querySelector<HTMLElement>(
    ".x-tabs__nav-item--active"
  );
};

// 计算指示器样式
const indicatorStyle = ref<{
  width?: string;
  height?: string;
  transform: string;
}>({
  transform: "translateX(0px)"
});

function updateIndicator() {
  const activeItem = activeTab.value;

  if (!activeItem) return;
  const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeItem;
  if (props.direction === "horizontal") {
    indicatorStyle.value.width = `${offsetWidth}px`;
    indicatorStyle.value.transform = `translateX(${offsetLeft}px)`;
  } else {
    indicatorStyle.value.height = `${offsetHeight}px`;
    indicatorStyle.value.transform = `translateY(${offsetTop}px)`;
  }
}

watchEffect(() => {
  updateIndicator();
});

// 更新滚动状态
const updateScrollable = () => {
  if (!navWrapRef.value || !navListRef.value) return;

  const navWrapSize =
    props.direction === "horizontal"
      ? navWrapRef.value.offsetWidth
      : navWrapRef.value.offsetHeight;
  const navListSize =
    props.direction === "horizontal"
      ? navListRef.value.offsetWidth
      : navListRef.value.offsetHeight;

  scrollable.value = navListSize > navWrapSize;

  if (scrollable.value) {
    showPrev.value = currentOffset.value > 0;
    showNext.value = currentOffset.value + navWrapSize < navListSize;
  } else {
    showPrev.value = showNext.value = false;
  }
};

// 滚动到指定位置
const scrollTo = (offset: number) => {
  if (!navScrollRef.value) return;

  currentOffset.value = offset;
  navScrollRef.value.style.transform =
    props.direction === "horizontal"
      ? `translateX(-${offset}px)`
      : `translateY(-${offset}px)`;
};

// 处理标签页点击
const handleTabClick = async (item: TabItem) => {
  if (item.disabled) return;

  if (props.beforeChange) {
    const canChange = await props.beforeChange(item.id!);
    if (!canChange) return;
  }

  updateActiveTab();
  emit("update:modelValue", item.id!);
  emit("change", item.id!);
};

// 处理标签页关闭
const handleTabClose = (item: TabItem) => {
  if (props.items.length === 1) return;

  // 更新激活标签。展示 item 的下一个标签，如果 item 是最后一个标签，则展示上一个标签
  if (item.id === props.modelValue) {
    const index = props.items.findIndex(it => it.id === item.id);
    const nextItem = props.items[index + 1];
    if (nextItem) {
      emit("update:modelValue", nextItem.id!);
    } else {
      emit("update:modelValue", props.items[index - 1].id!);
    }

    emit("close", item.id!);
  } else {
    emit("close", item.id!);

    nextTick(() => {
      updateIndicator();
    });
  }
};

// 处理滚动按钮点击
const handlePrevClick = () => {
  if (!navWrapRef.value) return;
  const wrapSize =
    props.direction === "horizontal"
      ? navWrapRef.value.offsetWidth
      : navWrapRef.value.offsetHeight;
  scrollTo(Math.max(0, currentOffset.value - wrapSize));
};

const handleNextClick = () => {
  if (!navWrapRef.value || !navListRef.value) return;
  const wrapSize =
    props.direction === "horizontal"
      ? navWrapRef.value.offsetWidth
      : navWrapRef.value.offsetHeight;
  const listSize =
    props.direction === "horizontal"
      ? navListRef.value.offsetWidth
      : navListRef.value.offsetHeight;
  scrollTo(Math.min(listSize - wrapSize, currentOffset.value + wrapSize));
};

// 监听激活标签页变化,滚动到可视区域
watch(
  () => props.modelValue,
  async () => {
    await nextTick();
    if (!activeTab.value || !navWrapRef.value) return;

    const activeRect = activeTab.value.getBoundingClientRect();
    const wrapRect = navWrapRef.value.getBoundingClientRect();

    if (props.direction === "horizontal") {
      if (activeRect.left < wrapRect.left) {
        scrollTo(currentOffset.value - (wrapRect.left - activeRect.left));
      } else if (activeRect.right > wrapRect.right) {
        scrollTo(currentOffset.value + (activeRect.right - wrapRect.right));
      }
    } else {
      if (activeRect.top < wrapRect.top) {
        scrollTo(currentOffset.value - (wrapRect.top - activeRect.top));
      } else if (activeRect.bottom > wrapRect.bottom) {
        scrollTo(currentOffset.value + (activeRect.bottom - wrapRect.bottom));
      }
    }
  }
);

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      updateActiveTab();
    });
  },
  { immediate: true }
);

// 监听尺寸变化
onMounted(() => {
  updateScrollable();
  useEventListener(window, "resize", updateScrollable);
});
</script>
