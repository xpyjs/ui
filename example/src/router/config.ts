import type { Component } from "vue";
import { type RouteRecordRaw } from "vue-router";

// 组件映射表
interface ComponentConfig {
  name: string; // 中文名称
  component: Component; // 组件
  description?: string; // 描述
}

interface ComponentConfigs {
  [key: string]: ComponentConfig;
}

const basicConfigs: ComponentConfigs = {
  color: {
    name: "Color 颜色",
    description: "内置颜色变量",
    component: () => import("../views/color/index.vue")
  }
};

const containerComponentConfigs: ComponentConfigs = {
  scroll: {
    name: "Scroll 滚动",
    description: "自定义滚动条组件",
    component: () => import("../views/scroll/index.vue")
  },
  collapse: {
    name: "Collapse 折叠面板",
    description: "可以折叠/展开的内容区域",
    component: () => import("../views/collapse/index.vue")
  },
  tabs: {
    name: "Tabs 标签页",
    description: "标签页组件",
    component: () => import("../views/tabs/index.vue")
  }
};

const baseComponentConfigs: ComponentConfigs = {
  button: {
    name: "Button 按钮",
    description: "常用的操作按钮",
    component: () => import("../views/button/index.vue")
  },
  link: {
    name: "Link 链接",
    description: "文字超链接组件",
    component: () => import("../views/link/index.vue")
  },
  icon: {
    name: "Icon 图标",
    description: "图标组件",
    component: () => import("../views/icon/index.vue")
  },
  input: {
    name: "Input 输入框",
    description: "基础表单输入组件",
    component: () => import("../views/input/index.vue")
  },
  select: {
    name: "Select 选择器",
    description: "基础选择器组件",
    component: () => import("../views/select/index.vue")
  },
  "radio-button": {
    name: "RadioButton 按钮单选框",
    description: "按钮样式的单选框组件",
    component: () => import("../views/radio-button/index.vue")
  },
  radio: {
    name: "Radio 单选框",
    description: "基础单选框组件",
    component: () => import("../views/radio/index.vue")
  },
  switch: {
    name: "Switch 开关",
    description: "基础开关组件",
    component: () => import("../views/switch/index.vue")
  },
  tag: {
    name: "Tag 标签",
    description: "用于标记和选择的标签组件",
    component: () => import("../views/tag/index.vue")
  },
  checkbox: {
    name: "Checkbox 复选框",
    description: "基础复选框组件",
    component: () => import("../views/checkbox/index.vue")
  },
  slider: {
    name: "Slider 滑块",
    description: "基础滑块组件",
    component: () => import("../views/slider/index.vue")
  },
  "color-picker": {
    name: "ColorPicker 颜色选择器",
    description: "基础颜色选择器组件",
    component: () => import("../views/color-picker/index.vue")
  },
  "input-number": {
    name: "InputNumber 数字输入框",
    description: "用于输入数字的输入框组件",
    component: () => import("../views/input-number/index.vue")
  }
  // 当新增组件时，在这里添加配置
};

const interactionComponentConfigs: ComponentConfigs = {
  popup: {
    name: "Popup 弹出框",
    description: "可以从元素边缘弹出的浮层",
    component: () => import("../views/popup/index.vue")
  },
  dialog: {
    name: "Dialog 对话框",
    description: "模态对话框组件",
    component: () => import("../views/dialog/index.vue")
  },
  loading: {
    name: "Loading 加载",
    description: "用于显示加载状态的组件",
    component: () => import("../views/loading/index.vue")
  },
  tooltip: {
    name: "Tooltip 文字提示",
    description: "鼠标悬停时显示的提示信息",
    component: () => import("../views/tooltip/index.vue")
  },
  toast: {
    name: "Toast 提示",
    description: "轻量级的信息反馈组件",
    component: () => import("../views/toast/index.vue")
  },
  message: {
    name: "Message 消息提示",
    description: "全局展示操作反馈信息",
    component: () => import("../views/message/index.vue")
  },
  information: {
    name: "Information 信息提示",
    description: "全局展示操作反馈信息，支持自定义内容",
    component: () => import("../views/information/index.vue")
  },
  menu: {
    name: "Menu 菜单",
    description: "弹出式的菜单列表",
    component: () => import("../views/menu/index.vue")
  }
};

const navigationComponentConfigs: ComponentConfigs = {
  breadcrumb: {
    name: "Breadcrumb 面包屑",
    description: "显示当前页面在系统层级结构中的位置",
    component: () => import("../views/breadcrumb/index.vue")
  },
  fixed: {
    name: "Fixed 固定",
    description: "可以固定在页面任意位置的固定组件",
    component: () => import("../views/fixed/index.vue")
  }
  // ... 其他导航组件
};

export const allComponentConfigs = {
  basic: basicConfigs,
  container: containerComponentConfigs,
  base: baseComponentConfigs,
  interaction: interactionComponentConfigs,
  navigation: navigationComponentConfigs // 添加导航组件配置
};

// 生成路由配置
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../layouts/BasicLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/button"
      },
      ...Object.values(allComponentConfigs)
        .map(component => {
          return Object.entries(component).map(([key, config]) => {
            return {
              path: `/${key}`,
              name: key,
              component: config.component,
              meta: {
                title: config.name,
                description: config.description
              }
            };
          });
        })
        .flat()
    ]
  }
];
