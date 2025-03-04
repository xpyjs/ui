import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Switch from "../src/switch.vue";
import { nextTick } from "vue";

describe("Switch 组件", () => {
  // 基础渲染测试
  describe("基础渲染", () => {
    it("正确渲染基础结构", () => {
      const wrapper = mount(Switch);
      expect(wrapper.classes()).toContain("x-switch");
      expect(wrapper.find(".x-switch__track").exists()).toBe(true);
      expect(wrapper.find(".x-switch__button").exists()).toBe(true);
    });

    it("默认未选中状态", () => {
      const wrapper = mount(Switch);
      expect(wrapper.classes()).not.toContain("x-switch--checked");
      expect(wrapper.attributes("aria-checked")).toBe("false");
    });

    it("可以设置初始选中状态", () => {
      const wrapper = mount(Switch, {
        props: { modelValue: true }
      });
      expect(wrapper.classes()).toContain("x-switch--checked");
      expect(wrapper.attributes("aria-checked")).toBe("true");
    });
  });

  // 交互测试
  describe("交互", () => {
    it("点击切换状态", async () => {
      const wrapper = mount(Switch, {
        props: { modelValue: false }
      });

      await wrapper.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);
      expect(wrapper.emitted("change")![0]).toEqual([true]);
    });

    it("禁用状态下不可点击", async () => {
      const wrapper = mount(Switch, {
        props: {
          modelValue: false,
          disabled: true
        }
      });

      await wrapper.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change")).toBeFalsy();
    });

    it("支持键盘操作", async () => {
      const wrapper = mount(Switch, {
        props: {
          modelValue: false,
          "onUpdate:modelValue": (value: boolean) => {
            wrapper.setProps({ modelValue: value });
          }
        }
      });

      await wrapper.trigger("keydown.space");
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);

      await wrapper.trigger("keydown.enter");
      expect(wrapper.emitted("update:modelValue")![1]).toEqual([false]);
    });
  });

  // 样式测试
  describe("样式", () => {
    it("支持不同尺寸", () => {
      const sizes = ["small", "medium", "large"] as const;
      sizes.forEach(size => {
        const wrapper = mount(Switch, { props: { size } });
        expect(wrapper.classes()).toContain(`x-switch--${size}`);
      });
    });

    it("支持不同类型", () => {
      const types = [
        "default",
        "primary",
        "success",
        "warning",
        "error"
      ] as const;
      types.forEach(type => {
        const wrapper = mount(Switch, { props: { type } });
        expect(wrapper.classes()).toContain(`x-switch--${type}`);
      });
    });

    it("自定义颜色", () => {
      const wrapper = mount(Switch, {
        props: {
          modelValue: true,
          activeColor: "#ff0000",
          inactiveColor: "#00ff00"
        }
      });

      const style = wrapper.attributes("style");
      expect(style).toContain("--x-switch-active-color: #ff0000");
    });
  });

  // 文本和图标测试
  describe("文本和图标", () => {
    it("显示文本描述", () => {
      const wrapper = mount(Switch, {
        props: {
          activeText: "开启",
          inactiveText: "关闭"
        }
      });

      const texts = wrapper.findAll(".x-switch__text");
      expect(texts[0].text()).toBe("关闭");
      expect(texts[1].text()).toBe("开启");
    });

    it("显示图标", () => {
      const wrapper = mount(Switch, {
        props: {
          modelValue: true,
          activeIcon: "check",
          inactiveIcon: "close"
        }
      });

      expect(wrapper.find(".x-switch__icon").exists()).toBe(true);
    });

    it("支持图标插槽", () => {
      const wrapper = mount(Switch, {
        props: { modelValue: true },
        slots: {
          activeIcon: '<div class="custom-icon">✓</div>'
        }
      });

      expect(wrapper.find(".custom-icon").exists()).toBe(true);
      expect(wrapper.find(".custom-icon").text()).toBe("✓");
    });
  });

  // 可访问性测试
  describe("可访问性", () => {
    it("正确设置 ARIA 属性", () => {
      const wrapper = mount(Switch, {
        props: {
          modelValue: true,
          disabled: true
        }
      });

      expect(wrapper.attributes("role")).toBe("switch");
      expect(wrapper.attributes("aria-checked")).toBe("true");
      expect(wrapper.attributes("aria-disabled")).toBe("true");
      expect(wrapper.attributes("tabindex")).toBe("0");
    });
  });
});
