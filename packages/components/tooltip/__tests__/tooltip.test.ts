import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Tooltip from "../src/tooltip.vue";
import { vi } from "vitest";

describe("Tooltip 组件", () => {
  let wrapper: any;

  beforeEach(() => {
    // 创建一个挂载点
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
    it("正确渲染基础 tooltip", async () => {
      wrapper = mount(Tooltip, {
        attachTo: document.body,
        props: {
          content: "这是一个提示",
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      expect(wrapper.find("button").exists()).toBe(true);

      // 触发 hover
      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      await nextTick();
      await nextTick(); // 等待 teleport 内容渲染

      // 检查 tooltip 内容
      const tooltip = document.querySelector(".x-tooltip");
      expect(tooltip).toBeTruthy();
      expect(tooltip?.textContent?.trim()).toBe("这是一个提示");
    });

    it("支持多行文本", async () => {
      wrapper = mount(Tooltip, {
        attachTo: document.body,
        props: {
          content: "第一行\n第二行",
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      await nextTick();
      await nextTick();

      const tooltip = document.querySelector(".x-popup__content");
      const lines = tooltip?.innerHTML?.trim().split("</div>");
      expect(lines?.[0]).toContain("第一行");
      expect(lines?.[1]).toContain("第二行");
    });
  });

  // 属性测试
  describe("属性", () => {
    it("inverse 属性正确应用样式", async () => {
      wrapper = mount(Tooltip, {
        attachTo: document.body,
        props: {
          content: "反色提示",
          inverse: true,
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      await nextTick();
      await nextTick();

      const tooltip = document.querySelector(".x-tooltip");
      expect(tooltip?.classList.contains("x-tooltip--inverse")).toBe(true);
    });

    it("placement 属性正确设置位置", async () => {
      wrapper = mount(Tooltip, {
        attachTo: document.body,
        props: {
          content: "提示内容",
          placement: "bottom",
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      await nextTick();
      await nextTick();

      const popup = document.querySelector(".x-popup");
      expect(popup?.classList.contains("x-popup--bottom")).toBe(true);
    });

    it("showArrow 属性控制箭头显示", async () => {
      wrapper = mount(Tooltip, {
        attachTo: document.body,
        props: {
          content: "提示内容",
          showArrow: false,
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      await nextTick();
      await nextTick();

      const popup = document.querySelector(".x-popup");
      expect(popup?.classList.contains("x-popup__arrow")).toBe(false);
    });
  });

  // 交互测试
  describe("交互", () => {
    it("hover 触发显示和隐藏", async () => {
      wrapper = mount(Tooltip, {
        attachTo: document.body,
        props: {
          content: "提示内容",
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      // 初始状态应该是隐藏的
      expect(document.querySelector(".x-tooltip")).toBeFalsy();

      // 鼠标移入
      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      await nextTick();
      await nextTick();
      expect(document.querySelector(".x-tooltip")).toBeTruthy();

      // 鼠标移出
      await wrapper.find(".x-popup-trigger").trigger("mouseleave");
      await nextTick();
      await nextTick();
      expect(document.querySelector(".x-tooltip")).toBeFalsy();
    });

    it("disabled 状态下不显示", async () => {
      wrapper = mount(Tooltip, {
        attachTo: document.body,
        props: {
          content: "提示内容",
          disabled: true,
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>"
        }
      });

      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      await nextTick();
      await nextTick();

      expect(document.querySelector(".x-tooltip")).toBeFalsy();
    });
  });
});
