import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, Transition } from "vue";
import Message from "../src/message.vue";

describe("Message 组件", () => {
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
  describe("基础渲染", () => {
    it("正确渲染消息内容", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          content: "测试消息"
        }
      });

      await nextTick();
      const message = document.querySelector(".x-message");
      expect(message).toBeTruthy();
      expect(message?.textContent?.trim()).toBe("测试消息");
    });

    it("根据 visible 控制显示/隐藏", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: false,
          content: "测试消息"
        }
      });

      await nextTick();
      let message = document.querySelector(".x-message");
      expect(message).toBeFalsy();

      await wrapper.setProps({ visible: true });
      await nextTick();
      message = document.querySelector(".x-message");
      expect(message).toBeTruthy();
    });
  });

  // 类型样式测试
  describe("类型样式", () => {
    const messageType = ["info", "success", "warning", "error"] as const;

    messageType.forEach(type => {
      it(`${type}类型`, async () => {
        wrapper = mount(Message, {
          appendTo: document.body,
          props: {
            visible: true,
            type: type as any
          }
        });

        await nextTick();
        const message = document.querySelector(".x-message");
        expect(message).toBeTruthy();
        expect(message?.classList.contains(`x-message--${type}`)).toBe(true);
      });
    });
  });

  // 位置测试
  describe("位置控制", () => {
    it("顶部显示", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          top: "top"
        }
      });

      await nextTick();
      const message = document.querySelector<HTMLElement>(".x-message");
      expect(message).toBeTruthy();
      expect(message?.style.top).toBe("calc(5vh + 0px)");
    });

    it("居中显示", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          top: "center"
        }
      });

      await nextTick();
      const message = document.querySelector<HTMLElement>(".x-message");
      expect(message).toBeTruthy();
      expect(message?.style.top).toBe("calc(50% - 0px + 0px)");
    });

    it("底部显示", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          top: "bottom"
        }
      });

      await nextTick();
      const message = document.querySelector<HTMLElement>(".x-message");
      expect(message).toBeTruthy();
      expect(message?.style.bottom).toBe("calc(5vh + 0px)");
    });

    it("自定义位置", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          top: "100px"
        }
      });

      await nextTick();
      const message = document.querySelector<HTMLElement>(".x-message");
      expect(message).toBeTruthy();
      expect(message?.style.top).toBe("calc(100px)");
    });
  });

  // 关闭控制测试
  describe("关闭控制", () => {
    it("自动关闭", async () => {
      vi.useFakeTimers();
      const onUpdateVisible = vi.fn();

      wrapper = mount(Message, {
        props: {
          visible: true,
          duration: 1000,
          "onUpdate:visible": onUpdateVisible
        }
      });

      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(onUpdateVisible).toHaveBeenCalledWith(false);
      vi.useRealTimers();
    });

    it("手动关闭", async () => {
      const onUpdateVisible = vi.fn();

      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          closable: true,
          "onUpdate:visible": onUpdateVisible
        }
      });

      await nextTick();
      const message = document.querySelector<HTMLElement>(".x-message");
      expect(message).toBeTruthy();
      const close = message?.querySelector(".x-message__close");
      close?.dispatchEvent(new Event("click"));
      expect(onUpdateVisible).toHaveBeenCalledWith(false);
    });

    it("鼠标移入暂停关闭", async () => {
      vi.useFakeTimers();
      const onUpdateVisible = vi.fn();

      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          duration: 1000,
          enterable: true,
          "onUpdate:visible": onUpdateVisible
        }
      });

      await nextTick();
      const message = document.querySelector<HTMLElement>(".x-message");
      expect(message).toBeTruthy();
      message?.dispatchEvent(new Event("mouseenter"));
      vi.advanceTimersByTime(1000);

      expect(onUpdateVisible).not.toHaveBeenCalled();

      await nextTick();
      message?.dispatchEvent(new Event("mouseleave"));
      vi.advanceTimersByTime(1000);

      expect(onUpdateVisible).toHaveBeenCalledWith(false);
      vi.useRealTimers();
    });
  });

  // 动画效果测试
  describe("动画效果", () => {
    it("默认动画", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true
        }
      });

      await nextTick();
      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("x-slide-down");
    });

    it("自定义动画", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          transitionName: "x-fade"
        }
      });

      await nextTick();
      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("x-fade");
    });

    it("禁用动画", async () => {
      wrapper = mount(Message, {
        appendTo: document.body,
        props: {
          visible: true,
          transitionName: false
        }
      });

      await nextTick();
      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("no-transition");
    });
  });
});
