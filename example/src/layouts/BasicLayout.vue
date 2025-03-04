<template>
  <div class="layout">
    <!-- 顶部菜单栏 -->
    <header class="header">
      <div class="logo">X-UI</div>
      <div class="theme-switch">
        <x-switch type="primary" :modelValue="isDark" @change="toggleTheme">
          <template #activeIcon>
            <x-icon name="material-symbols:dark-mode" />
          </template>
          <template #inactiveIcon>
            <x-icon name="material-symbols:light-mode" />
          </template>
        </x-switch>
      </div>
    </header>

    <div class="container">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <template
          v-for="(category, i) in [
            { title: '基础', list: allComponentConfigs.basic },
            { title: '容器', list: allComponentConfigs.container },
            { title: '基础组件', list: allComponentConfigs.base },
            { title: '导航', list: allComponentConfigs.navigation },
            { title: '交互', list: allComponentConfigs.interaction }
          ]"
          :key="i"
        >
          <div class="menu-divider" v-if="i !== 0"></div>

          <div class="menu-group">{{ category.title }}</div>
          <nav class="menu">
            <router-link
              v-for="(config, key) in Object.fromEntries(
                Object.entries(category.list).sort((a, b) =>
                  a[1].name.localeCompare(b[1].name)
                )
              )"
              :key="key"
              :to="`/${key}`"
              class="menu-item"
              :class="{ active: route.path === `/${key}` }"
            >
              {{ config.name }}
            </router-link>
          </nav>
        </template>
      </aside>

      <!-- 主内容区 -->
      <main class="main">
        <Container
          :title="currentComponent?.name"
          :desc="currentComponent?.description"
        >
          <router-view></router-view>
        </Container>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { allComponentConfigs } from "../router/config";
import Container from "../components/Container.vue";

const route = useRoute();
const isDark = ref(
  document.documentElement.getAttribute("data-theme") === "dark"
);

// 初始化时强制设置为亮色模式（可选）
document.documentElement.setAttribute(
  "data-theme",
  isDark.value ? "dark" : "light"
);

const currentComponent = computed(() => {
  const key = route.path.slice(1);
  return Object.values(allComponentConfigs).find(c =>
    Object.keys(c).includes(key)
  )?.[key];
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute(
    "data-theme",
    isDark.value ? "dark" : "light"
  );
};
</script>

<style scoped>
.layout {
  width: 100%;
  min-height: 100vh;
}

.header {
  height: 60px;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: var(--x-color-primary);
}

.theme-switch {
  margin-left: auto;
}

.container {
  display: flex;
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  width: 100%;
}

.sidebar {
  width: 220px;
  border-right: 1px solid var(--border-color);
  background: var(--bg-primary);
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: fixed;
  left: 0;
  padding: 12px 0;
  box-sizing: border-box;
}

.menu-divider {
  width: 100%;
  height: 1px;
  background: var(--border-color);
  margin: 16px 0;
}

.menu-group {
  padding: 12px 24px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
}

.menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 12px 24px;
  box-sizing: border-box;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}

.menu-item:hover {
  color: var(--x-color-primary);
  background: var(--bg-secondary);
}

.menu-item.active {
  color: var(--x-color-primary);
  background: var(--bg-secondary);
  font-weight: 500;
}

.main {
  flex: 1;
  padding: 24px;
  margin-left: 220px;
  overflow-y: auto;
  background: var(--bg-primary);
  width: calc(100% - 220px);
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
}
</style>
