import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, Transition } from "vue";
import Modal from "../src/modal.vue";

describe("Modal 组件", () => {
  let wrapper: any;

  beforeEach(() => {
    // 创建挂载点
    const div = document.createElement("div");
    div.id = "app";
    document.body.appendChild(div);
  });

  afterEach(() => {
    // 清理
    document.body.innerHTML = "";
    if (wrapper) {
      wrapper.unmount();
    }
  });

  // 基础渲染测试
  describe("渲染", () => {
    it("正确渲染基础 modal", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true
        },
        slots: {
          default: "<div>Modal Content</div>"
        }
      });

      await nextTick();
      const modal = document.querySelector(".x-modal");
      expect(modal).toBeTruthy();
      expect(modal?.textContent?.trim()).toBe("Modal Content");
    });

    it("不显示时不渲染内容", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: false
        },
        slots: {
          default: "<div>Modal Content</div>"
        }
      });

      await nextTick();
      const modal = document.querySelector(".x-modal");
      expect(modal).toBeFalsy();
    });
  });

  // 属性测试
  describe("属性", () => {
    it("mask 属性控制遮罩层显示", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true,
          mask: false
        },
        slots: {
          default: "<div>Modal Content</div>"
        }
      });

      await nextTick();
      const modal = document.querySelector(".x-modal");
      expect(modal).toBeFalsy();
      expect(document.body.textContent?.trim()).toBe("Modal Content");
    });

    it("zIndex 属性正确设置层级", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true,
          zIndex: 2000
        }
      });

      await nextTick();
      const modal = document.querySelector<HTMLElement>(".x-modal");
      expect(modal?.style.getPropertyValue("--z-index")).toBe("2000");
    });

    it("appendTo 属性控制挂载位置", async () => {
      const container = document.createElement("div");
      container.id = "container";
      document.body.appendChild(container);

      wrapper = mount(Modal, {
        props: {
          visible: true,
          appendTo: "#container"
        },
        slots: {
          default: "<div>Modal Content</div>"
        }
      });

      await nextTick();
      const modalInContainer = container.querySelector(".x-modal");
      expect(modalInContainer).toBeTruthy();
    });
  });

  // 交互测试
  describe("交互", () => {
    it("点击遮罩层关闭", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true,
          maskClosable: true
        }
      });

      await nextTick();
      const modal = document.querySelector(".x-modal");
      await modal?.dispatchEvent(new Event("click"));
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([false]);
    });

    it("maskClosable 为 false 时点击遮罩层不关闭", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true,
          maskClosable: false
        }
      });

      await nextTick();
      const modal = document.querySelector(".x-modal");
      await modal?.dispatchEvent(new Event("click"));
      expect(wrapper.emitted("update:visible")).toBeFalsy();
    });

    it("触发正确的生命周期事件", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: false
        }
      });

      // 直接触发 transition 事件
      const transition = wrapper.findComponent(Transition);
      transition.vm.$emit("before-enter");
      expect(wrapper.emitted("show")).toBeTruthy();

      transition.vm.$emit("after-enter");
      expect(wrapper.emitted("shown")).toBeTruthy();

      // 隐藏
      transition.vm.$emit("before-leave");
      expect(wrapper.emitted("hide")).toBeTruthy();

      transition.vm.$emit("after-leave");
      expect(wrapper.emitted("hidden")).toBeTruthy();
    });

    it("lockScroll 属性控制滚动锁定", async () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: false,
          lockScroll: true
        }
      });

      await wrapper.setProps({ visible: true });
      // 添加额外的等待以确保样式已被应用
      await nextTick();

      expect(document.body.style.overflow).toBe("hidden");

      await wrapper.setProps({ visible: false });
      await nextTick();
      expect(document.body.style.overflow).toBe("");
    });
  });

  // 过渡动画测试
  describe("过渡动画", () => {
    it("使用默认过渡动画", () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true
        }
      });

      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("x-fade");
    });

    it("自定义过渡动画名称", () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true,
          transitionName: "x-zoom"
        }
      });

      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("x-zoom");
    });

    it("禁用过渡动画", () => {
      wrapper = mount(Modal, {
        attachTo: document.body,
        props: {
          visible: true,
          transitionName: false
        }
      });

      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("no-transition");
    });
  });
});
