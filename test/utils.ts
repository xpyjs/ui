import { mount as _mount } from "@vue/test-utils";
import type { Component } from "vue";

// 扩展 mount 方法，添加通用配置
export function mount(component: Component, options = {}) {
  return _mount(component, {
    ...options,
    global: {
      stubs: {
        transition: false,
        ...options?.global?.stubs
      },
      ...options?.global
    }
  });
}
