import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, Transition } from "vue";
import Information from "../src/information.vue";

describe("Information 组件", () => {
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
    it("正确渲染标题和内容", async () => {
      wrapper = mount(Information, {
        attachTo: document.body,
        props: {
          visible: true,
          title: "测试标题",
          content: "测试内容"
        }
      });

      await nextTick();
      expect(document.querySelector(".x-information__title")?.textContent).toBe(
        "测试标题"
      );
      expect(
        document.querySelector(".x-information__content")?.textContent
      ).toBe("测试内容");
    });

    it("支持自定义标题插槽", async () => {
      wrapper = mount(Information, {
        attachTo: document.body,
        props: {
          visible: true
        },
        slots: {
          title: "<div class='custom-title'>自定义标题</div>"
        }
      });

      await nextTick();
      expect(document.querySelector(".custom-title")?.textContent).toBe(
        "自定义标题"
      );
    });

    it("支持自定义内容插槽", async () => {
      wrapper = mount(Information, {
        attachTo: document.body,
        props: {
          visible: true
        },
        slots: {
          default: "<div class='custom-content'>自定义内容</div>"
        }
      });

      await nextTick();
      expect(document.querySelector(".custom-content")?.textContent).toBe(
        "自定义内容"
      );
    });
  });

  // 功能测试
  describe("功能", () => {
    it("点击关闭按钮可以关闭", async () => {
      wrapper = mount(Information, {
        attachTo: document.body,
        props: {
          visible: true,
          closable: true
        }
      });

      await nextTick();
      const closeBtn = document.querySelector(".x-information__close");
      closeBtn?.dispatchEvent(new Event("click"));
      await nextTick();
      expect(wrapper.emitted()["update:visible"][0]).toEqual([false]);
    });

    it("自动关闭功能", async () => {
      vi.useFakeTimers();
      wrapper = mount(Information, {
        attachTo: document.body,
        props: {
          visible: true,
          duration: 1000
        }
      });

      await nextTick();
      vi.advanceTimersByTime(1000);
      expect(wrapper.emitted()["update:visible"][0]).toEqual([false]);
      vi.useRealTimers();
    });

    it("鼠标移入暂停自动关闭", async () => {
      vi.useFakeTimers();
      wrapper = mount(Information, {
        attachTo: document.body,
        props: {
          visible: true,
          duration: 1000,
          enterable: true
        }
      });

      await nextTick();
      const information = document.querySelector(".x-information");
      information?.dispatchEvent(new Event("mouseenter"));
      await nextTick();
      vi.advanceTimersByTime(1000);
      expect(wrapper.emitted()["update:visible"]).toBeFalsy();
      vi.useRealTimers();
    });
  });

  // 样式测试
  describe("样式", () => {
    it("不同类型的样式", async () => {
      const types = ["default", "info", "success", "warning", "error"] as const;
      for (const type of types) {
        wrapper = mount(Information, {
          attachTo: document.body,
          props: {
            visible: true,
            type: type as any
          }
        });

        await nextTick();
        expect(
          document.querySelector(`.x-information--${type}`)
        ).not.toBeNull();
      }
    });

    it("不同位置的样式", async () => {
      const positions = [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right"
      ] as const;
      for (const position of positions) {
        wrapper = mount(Information, {
          attachTo: document.body,
          props: {
            visible: true,
            position
          }
        });

        await nextTick();
        expect(
          document.querySelector(`.x-information--${position}`)
        ).not.toBeNull();
      }
    });

    it("自定义过渡动画", async () => {
      wrapper = mount(Information, {
        attachTo: document.body,
        props: {
          visible: true,
          transitionName: "x-zoom"
        }
      });

      await nextTick();
      const transition = wrapper.findComponent(Transition);
      expect(transition.attributes("name")).toBe("x-zoom");
    });

    it("禁用过渡动画", async () => {
      wrapper = mount(Information, {
        attachTo: document.body,
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
