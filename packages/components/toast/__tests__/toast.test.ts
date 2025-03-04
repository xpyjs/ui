import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, Transition } from "vue";
import { XIcon } from "../../icon";
import Toast from "../src/toast.vue";

describe("Toast 组件", () => {
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
    it("正确渲染基础 toast", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          content: "这是一条提示消息"
        }
      });

      await nextTick();
      const toast = document.querySelector(".x-toast");
      expect(toast).toBeTruthy();
      expect(toast?.textContent?.trim()).toBe("这是一条提示消息");
    });

    it("不显示时不渲染内容", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: false,
          content: "这是一条提示消息"
        }
      });

      await nextTick();
      const toast = document.querySelector(".x-toast");
      expect(toast).toBeFalsy();
    });
  });

  // 属性测试
  describe("属性", () => {
    it("type 属性正确应用样式和图标", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          type: "success" as any,
          content: "成功提示"
        }
      });

      await nextTick();
      const toast = document.querySelector(".x-toast");
      expect(toast?.classList.contains("x-toast--success")).toBe(true);
      expect(document.querySelector(".x-toast__icon")).toBeTruthy();
    });

    it("自定义图标", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          icon: "test-icon",
          content: "自定义图标"
        }
      });

      await nextTick();
      const icon = wrapper.findComponent(XIcon);
      expect(icon.vm?.name).toBe("test-icon");
    });

    it("inverse 属性控制样式反转", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          inverse: true,
          content: "反转样式"
        }
      });

      await nextTick();
      const toast = document.querySelector(".x-toast");
      expect(toast?.classList.contains("x-toast--inverse")).toBe(true);
    });

    it("top 属性控制位置", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          top: "center",
          content: "居中提示"
        }
      });

      await nextTick();
      const toast = document.querySelector<HTMLElement>(".x-toast");
      expect(toast?.style.top).toContain("50%");
    });
  });

  // 事件测试
  describe("事件", () => {
    it("自动关闭", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          duration: 100,
          content: "自动关闭"
        }
      });

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([false]);
    });

    it("手动关闭", async () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          content: "手动关闭"
        }
      });

      let toast = document.querySelector(".x-toast");
      expect(toast).toBeTruthy();

      await wrapper.setProps({ visible: false });
      await nextTick();
      toast = document.querySelector(".x-toast");
      expect(toast).toBeFalsy();
    });
  });

  // 过渡动画测试
  describe("过渡动画", () => {
    it("使用默认过渡动画", () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          content: "默认动画"
        }
      });

      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("x-fade");
    });

    it("自定义过渡动画", () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          transitionName: "x-zoom",
          content: "自定义动画"
        }
      });

      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("x-zoom");
    });

    it("禁用过渡动画", () => {
      wrapper = mount(Toast, {
        attachTo: document.body,
        props: {
          visible: true,
          transitionName: false,
          content: "无动画"
        }
      });

      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("no-transition");
    });
  });
});
