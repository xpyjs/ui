import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Popup from "../src/popup.vue";

describe("Popup 组件", () => {
  // 渲染测试
  describe("渲染", () => {
    it("正确渲染基础弹窗", () => {
      const wrapper = mount(Popup, {
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      expect(wrapper.find(".x-popup-trigger").exists()).toBe(true);
      expect(wrapper.find("button").exists()).toBe(true);
    });

    it("使用不同触发方式", () => {
      const triggers = [
        "click",
        "hover",
        "focus",
        "contextmenu",
        "manual"
      ] as const;
      triggers.forEach(trigger => {
        const wrapper = mount(Popup, {
          props: { trigger },
          slots: {
            default: "<button>触发按钮</button>",
            content: "<div>弹窗内容</div>"
          }
        });
        expect(wrapper.props("trigger")).toBe(trigger);
      });
    });

    it("使用不同位置", () => {
      const placements = [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end"
      ] as const;
      placements.forEach(placement => {
        const wrapper = mount(Popup, {
          props: { placement },
          slots: {
            default: "<button>触发按钮</button>",
            content: "<div>弹窗内容</div>"
          }
        });
        expect(wrapper.props("placement")).toBe(placement);
      });
    });
  });

  // 功能测试
  describe("功能", () => {
    it("点击触发显示/隐藏", async () => {
      const wrapper = mount(Popup, {
        props: {
          trigger: "click"
        },
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([true]);

      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("update:visible")?.[1]).toEqual([false]);
    });

    it("悬停触发显示/隐藏", async () => {
      const wrapper = mount(Popup, {
        attachTo: document.body,
        props: {
          trigger: "hover",
          showDelay: 0,
          hideDelay: 0
        },
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      await wrapper.find(".x-popup-trigger").trigger("mouseenter");
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([true]);

      await wrapper.find(".x-popup-trigger").trigger("mouseleave");
      expect(wrapper.emitted("update:visible")?.[1]).toEqual([false]);

      wrapper.unmount();
    });

    it("手动控制显示/隐藏", async () => {
      const wrapper = mount(Popup, {
        props: {
          trigger: "manual",
          visible: false
        },
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      await wrapper.setProps({ visible: true });
      expect(wrapper.vm.popupVisible).toEqual(true);

      await wrapper.setProps({ visible: false });
      expect(wrapper.vm.popupVisible).toEqual(false);
    });

    it("点击外部关闭", async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: true,
          hideOnClick: true
        },
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      const event = new MouseEvent("mousedown");
      document.dispatchEvent(event);
      await nextTick();

      expect(wrapper.emitted("update:visible")?.[0]).toEqual([false]);
      expect(wrapper.emitted("click-outside")?.[0]).toBeDefined();
    });

    it("禁用状态", async () => {
      const wrapper = mount(Popup, {
        props: {
          disabled: true,
          trigger: "click"
        },
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("update:visible")).toBeFalsy();
    });

    it("ESC 键关闭", async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: true,
          hideOnEsc: true,
          appendTo: null,
          transitionName: false
        },

        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      expect(wrapper.vm.popupVisible).toBeTruthy();
      expect(wrapper.find(".x-popup").exists()).toBe(true);

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
      await nextTick();

      expect(wrapper.find(".x-popup").exists()).toBe(false);
      expect(wrapper.vm.popupVisible).toBeFalsy();
    });
  });

  // 事件测试
  describe("事件", () => {
    it("点击触发器时正确切换显示状态", async () => {
      const wrapper = mount(Popup, {
        props: {
          trigger: "click",
          visible: false,
          appendTo: null // 防止 teleport
        },
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });
      const triggerBtn = wrapper.find("button");

      // 点击显示
      await triggerBtn.trigger("click");
      await nextTick();

      expect(wrapper.emitted()).toHaveProperty("update:visible");
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([true]);

      // 设置为显示状态
      await wrapper.setProps({ visible: true });
      await nextTick();

      // 再次点击隐藏
      await triggerBtn.trigger("click");
      await nextTick();

      expect(wrapper.emitted("update:visible")?.[1]).toEqual([false]);
    });

    it("可以通过 v-model 控制显示状态", async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: false,
          appendTo: null,
          transitionName: false
        },
        slots: {
          default: "<button>触发按钮</button>",
          content: "<div>弹窗内容</div>"
        }
      });

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(wrapper.find(".x-popup").exists()).toBe(true);

      // 触发隐藏
      await wrapper.setProps({ visible: false });
      await nextTick();
      expect(wrapper.find(".x-popup").exists()).toBe(false);
    });
  });
});
