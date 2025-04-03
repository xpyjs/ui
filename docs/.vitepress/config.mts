import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "X-UI",
  base: '/ui/',
  description: "X-UI 文档站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始', link: '/guide/' },
      { text: '组件', link: '/components' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '安装', link: '/guide/installation' },
          { text: '样式基础', link: '/guide/style' },
        ]
      },
      {
        text: '设计',
        items: [
          { text: '颜色', link: '/design/color' },
          { text: '尺寸', link: '/design/size' },
        ]
      },
      {
        text: '组件系统',
        link: '/components/',
        items: [
          {
            text: '容器组件',
            items: [
              { text: 'Collapse 折叠面板', link: '/components/collapse' },
              { text: 'Scroll 滚动容器', link: '/components/scroll' },
              { text: 'Tabs 标签页', link: '/components/tabs' },
            ]
          },
          {
            text: '基础组件',
            items: [
              { text: 'Button 按钮', link: '/components/button' },
              { text: 'Checkbox 复选框', link: '/components/checkbox' },
              { text: 'ColorPicker 颜色选择器', link: '/components/color-picker' },
              { text: 'Icon 图标', link: '/components/icon' },
              { text: 'Input 输入框', link: '/components/input' },
              { text: 'InputNumber 数字输入框', link: '/components/input-number' },
              { text: 'Link 链接', link: '/components/link' },
              { text: 'Radio 单选框', link: '/components/radio' },
              { text: 'RadioButton 单选按钮', link: '/components/radio-button' },
              { text: 'Select 选择器', link: '/components/select' },
              { text: 'Slider 滑块', link: '/components/slider' },
              { text: 'Switch 开关', link: '/components/switch' },
              { text: 'Tag 标签', link: '/components/tag' },
            ]
          },
          {
            text: '导航组件',
            items: [
              { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
              { text: 'Fixed 固定', link: '/components/fixed' },
            ]
          },
          {
            text: '交互组件',
            items: [
              { text: 'Dialog 对话框', link: '/components/dialog' },
              { text: 'Information 信息提示', link: '/components/information' },
              { text: 'Loading 加载', link: '/components/loading' },
              { text: 'Menu 菜单', link: '/components/menu' },
              { text: 'Message 消息提示', link: '/components/message' },
              { text: 'Popup 弹出框', link: '/components/popup' },
              { text: 'Toast 提示', link: '/components/toast' },
              { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright:
        'Copyright © 2020-present <a href="https://www.xiaopangying.com">XiaoPangYing.COM</a>'
    }
  },

  // 防止死链失败
  ignoreDeadLinks: true,

  markdown: {
    config: md => {
      md.use(demoblockPlugin as any);
    }
  },

  vite: {
    plugins: [demoblockVitePlugin()]
  }
})
